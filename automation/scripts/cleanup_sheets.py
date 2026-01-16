#!/usr/bin/env python3
"""
Google Sheets Cleanup Script
Xóa các sheets không cần thiết từ Google Spreadsheet
"""

import os
import sys
import json
from pathlib import Path
from datetime import datetime

# Add project root to path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

try:
    from google.oauth2.service_account import Credentials
    from googleapiclient.discovery import build
    from googleapiclient.errors import HttpError
except ImportError:
    print("❌ Missing dependencies. Install with: pip install google-auth google-api-python-client")
    sys.exit(1)


# Configuration
SPREADSHEET_ID = os.getenv(
    'GOOGLE_SHEETS_SPREADSHEET_ID',
    '18B1PIhCDmBWyHZytvOcfj_1QbYBwczLf1x1Qbu0E5As'
)

# Paths to credentials file
CREDENTIALS_PATHS = [
    os.getenv('GOOGLE_APPLICATION_CREDENTIALS'),
    os.getenv('GOOGLE_SERVICE_ACCOUNT_KEY_PATH'),
    project_root / 'config' / 'service_account.json',
    project_root / 'automation_new' / 'config' / 'service_account.json',
    Path(__file__).parent.parent.parent / 'config' / 'service_account.json',
]

# Sheets to keep (whitelist)
SHEETS_TO_KEEP = [
    'Config',
    'SLA_Rules',
    'Automation_Logs',
    'Dashboard',
    'Data',
    'Sheet1',
    'Orders',
    'Products',
]


def find_credentials():
    """Find credentials file"""
    for path in CREDENTIALS_PATHS:
        if path and Path(path).exists():
            return str(Path(path).absolute())
    return None


def authenticate():
    """Authenticate with Google Sheets API"""
    creds_path = find_credentials()
    if not creds_path:
        raise FileNotFoundError(
            "Credentials file not found. Please set GOOGLE_APPLICATION_CREDENTIALS "
            "or place service_account.json in config/"
        )
    
    scopes = [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
    ]
    
    creds = Credentials.from_service_account_file(creds_path, scopes=scopes)
    service = build('sheets', 'v4', credentials=creds)
    return service


def list_sheets(service, spreadsheet_id):
    """List all sheets in spreadsheet"""
    try:
        spreadsheet = service.spreadsheets().get(spreadsheetId=spreadsheet_id).execute()
        sheets = spreadsheet.get('sheets', [])
        
        sheet_list = []
        for sheet in sheets:
            props = sheet.get('properties', {})
            sheet_list.append({
                'sheetId': props.get('sheetId'),
                'title': props.get('title'),
                'rowCount': props.get('gridProperties', {}).get('rowCount', 0),
                'columnCount': props.get('gridProperties', {}).get('columnCount', 0),
            })
        
        return sheet_list
    except HttpError as error:
        print(f"❌ Error listing sheets: {error}")
        return []


def delete_sheets(service, spreadsheet_id, sheet_ids, dry_run=False):
    """Delete sheets by their IDs"""
    if not sheet_ids:
        print("⚠️ No sheets to delete")
        return
    
    requests = []
    for sheet_id in sheet_ids:
        requests.append({
            'deleteSheet': {
                'sheetId': sheet_id
            }
        })
    
    if dry_run:
        print(f"🔍 DRY RUN: Would delete {len(requests)} sheets")
        return
    
    try:
        body = {'requests': requests}
        response = service.spreadsheets().batchUpdate(
            spreadsheetId=spreadsheet_id,
            body=body
        ).execute()
        
        print(f"✅ Successfully deleted {len(requests)} sheets")
        return response
    except HttpError as error:
        print(f"❌ Error deleting sheets: {error}")
        raise


def main():
    """Main function"""
    import argparse
    
    parser = argparse.ArgumentParser(
        description='Cleanup Google Sheets - Remove unnecessary sheets'
    )
    parser.add_argument(
        '--spreadsheet-id',
        default=SPREADSHEET_ID,
        help='Google Spreadsheet ID'
    )
    parser.add_argument(
        '--keep',
        nargs='+',
        default=SHEETS_TO_KEEP,
        help='Sheet names to keep (whitelist)'
    )
    parser.add_argument(
        '--delete-pattern',
        help='Delete sheets matching pattern (e.g., "Verification_*", "Dashboard_*")'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Show what would be deleted without actually deleting'
    )
    parser.add_argument(
        '--interactive',
        action='store_true',
        help='Interactive mode: ask for confirmation before deleting'
    )
    parser.add_argument(
        '--list-only',
        action='store_true',
        help='Only list sheets, do not delete'
    )
    
    args = parser.parse_args()
    
    print("🧹 Google Sheets Cleanup Script")
    print("=" * 60)
    print(f"📊 Spreadsheet ID: {args.spreadsheet_id}")
    print(f"✅ Sheets to keep: {', '.join(args.keep)}")
    if args.delete_pattern:
        print(f"🗑️  Delete pattern: {args.delete_pattern}")
    print()
    
    # Authenticate
    try:
        service = authenticate()
        print("✅ Authenticated with Google Sheets API")
    except Exception as e:
        print(f"❌ Authentication failed: {e}")
        sys.exit(1)
    
    # List sheets
    sheets = list_sheets(service, args.spreadsheet_id)
    print(f"\n📋 Found {len(sheets)} sheets:\n")
    
    # Categorize sheets
    sheets_to_delete = []
    sheets_to_keep_list = []
    
    for sheet in sheets:
        title = sheet['title']
        sheet_id = sheet['sheetId']
        
        # Check if should keep
        should_keep = title in args.keep
        
        # Check pattern match
        should_delete_by_pattern = False
        if args.delete_pattern:
            import fnmatch
            should_delete_by_pattern = fnmatch.fnmatch(title, args.delete_pattern)
        
        if should_keep:
            sheets_to_keep_list.append(sheet)
            status = "✅ KEEP"
        elif should_delete_by_pattern:
            sheets_to_delete.append(sheet)
            status = "🗑️  DELETE (pattern)"
        else:
            sheets_to_delete.append(sheet)
            status = "🗑️  DELETE"
        
        print(f"  {status}: {title} (ID: {sheet_id}, {sheet['rowCount']} rows)")
    
    print(f"\n📊 Summary:")
    print(f"  ✅ Keep: {len(sheets_to_keep_list)} sheets")
    print(f"  🗑️  Delete: {len(sheets_to_delete)} sheets")
    
    if args.list_only:
        print("\n🔍 List-only mode, no deletions performed")
        return
    
    if not sheets_to_delete:
        print("\n✅ No sheets to delete")
        return
    
    # Confirm deletion
    if args.dry_run:
        print(f"\n🔍 DRY RUN: Would delete {len(sheets_to_delete)} sheets:")
        for sheet in sheets_to_delete:
            print(f"  - {sheet['title']} (ID: {sheet['sheetId']})")
        return
    
    if args.interactive:
        print(f"\n⚠️  About to delete {len(sheets_to_delete)} sheets:")
        for sheet in sheets_to_delete:
            print(f"  - {sheet['title']} (ID: {sheet['sheetId']})")
        confirm = input("\n❓ Continue? (yes/no): ").strip().lower()
        if confirm not in ['yes', 'y']:
            print("❌ Cancelled")
            return
    
    # Delete sheets
    sheet_ids_to_delete = [s['sheetId'] for s in sheets_to_delete]
    try:
        delete_sheets(service, args.spreadsheet_id, sheet_ids_to_delete, dry_run=False)
        print(f"\n✅ Cleanup complete!")
        print(f"   Deleted: {len(sheets_to_delete)} sheets")
        print(f"   Kept: {len(sheets_to_keep_list)} sheets")
    except Exception as e:
        print(f"\n❌ Error during cleanup: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()

