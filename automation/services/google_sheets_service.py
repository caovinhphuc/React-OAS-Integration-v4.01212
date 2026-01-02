import os
import json
import logging
from datetime import datetime
from typing import List, Dict, Any, Optional
from google.auth.transport.requests import Request
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GoogleSheetsService:
    """Service class for Google Sheets API operations"""
    
    def __init__(self, service_account_file: str = None, sheet_id: str = None):
        """
        Initialize Google Sheets Service
        
        Args:
            service_account_file: Path to service account JSON file
            sheet_id: Google Sheet ID
        """
        self.service_account_file = service_account_file or os.getenv('GOOGLE_SERVICE_ACCOUNT_FILE')
        self.sheet_id = sheet_id or os.getenv('GOOGLE_SHEET_ID')
        self.credentials = None
        self.service = None
        
        if not self.service_account_file:
            raise ValueError("Service account file path is required")
        if not self.sheet_id:
            raise ValueError("Google Sheet ID is required")
            
        self._authenticate()
    
    def _authenticate(self):
        """Authenticate with Google Sheets API"""
        try:
            SCOPES = [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive.readonly'
            ]
            
            self.credentials = Credentials.from_service_account_file(
                self.service_account_file, scopes=SCOPES)
            
            self.service = build('sheets', 'v4', credentials=self.credentials)
            logger.info("Successfully authenticated with Google Sheets API")
            
        except Exception as e:
            logger.error(f"Authentication failed: {e}")
            raise
    
    def get_sheet_info(self) -> Dict[str, Any]:
        """Get basic information about the spreadsheet"""
        try:
            sheet_metadata = self.service.spreadsheets().get(
                spreadsheetId=self.sheet_id
            ).execute()
            
            return {
                'title': sheet_metadata.get('properties', {}).get('title'),
                'sheets': [sheet['properties']['title'] for sheet in sheet_metadata.get('sheets', [])],
                'total_sheets': len(sheet_metadata.get('sheets', [])),
                'created_time': sheet_metadata.get('properties', {}).get('createdTime'),
                'updated_time': sheet_metadata.get('properties', {}).get('updatedTime')
            }
        except HttpError as e:
            logger.error(f"Failed to get sheet info: {e}")
            return {}
    
    def read_data(self, range_name: str = "Data!A1:Z1000") -> List[List[str]]:
        """
        Read data from specified range
        
        Args:
            range_name: Range to read (e.g., 'Sheet1!A1:C10')
            
        Returns:
            List of rows, each row is a list of cell values
        """
        try:
            sheet = self.service.spreadsheets()
            result = sheet.values().get(
                spreadsheetId=self.sheet_id,
                range=range_name,
                valueRenderOption='UNFORMATTED_VALUE',
                dateTimeRenderOption='FORMATTED_STRING'
            ).execute()
            
            values = result.get('values', [])
            logger.info(f"Successfully read {len(values)} rows from {range_name}")
            return values
            
        except HttpError as e:
            logger.error(f"Failed to read data from {range_name}: {e}")
            return []
    
    def read_as_dict(self, range_name: str = "Data!A1:Z1000") -> List[Dict[str, Any]]:
        """
        Read data and convert to list of dictionaries using first row as headers
        
        Args:
            range_name: Range to read
            
        Returns:
            List of dictionaries with column headers as keys
        """
        values = self.read_data(range_name)
        if not values or len(values) < 2:
            return []
        
        headers = values[0]
        data_rows = values[1:]
        
        result = []
        for row in data_rows:
            row_dict = {}
            for i, header in enumerate(headers):
                row_dict[header] = row[i] if i < len(row) else ''
            result.append(row_dict)
        
        return result
    
    def write_data(self, range_name: str, values: List[List[str]], 
                   value_input_option: str = 'RAW') -> Dict[str, Any]:
        """
        Write data to specified range
        
        Args:
            range_name: Range to write to
            values: 2D list of values to write
            value_input_option: How to interpret input ('RAW' or 'USER_ENTERED')
            
        Returns:
            Response from API
        """
        try:
            sheet = self.service.spreadsheets()
            body = {'values': values}
            
            result = sheet.values().update(
                spreadsheetId=self.sheet_id,
                range=range_name,
                valueInputOption=value_input_option,
                body=body
            ).execute()
            
            updated_cells = result.get('updatedCells', 0)
            logger.info(f"Successfully updated {updated_cells} cells in {range_name}")
            return result
            
        except HttpError as e:
            logger.error(f"Failed to write data to {range_name}: {e}")
            return {}
    
    def append_data(self, range_name: str, values: List[List[str]], 
                    value_input_option: str = 'RAW') -> Dict[str, Any]:
        """
        Append data to the end of specified range
        
        Args:
            range_name: Range to append to
            values: 2D list of values to append
            value_input_option: How to interpret input
            
        Returns:
            Response from API
        """
        try:
            sheet = self.service.spreadsheets()
            body = {'values': values}
            
            result = sheet.values().append(
                spreadsheetId=self.sheet_id,
                range=range_name,
                valueInputOption=value_input_option,
                insertDataOption='INSERT_ROWS',
                body=body
            ).execute()
            
            updated_rows = result.get('updates', {}).get('updatedRows', 0)
            logger.info(f"Successfully appended {updated_rows} rows to {range_name}")
            return result
            
        except HttpError as e:
            logger.error(f"Failed to append data to {range_name}: {e}")
            return {}
    
    def clear_data(self, range_name: str) -> Dict[str, Any]:
        """
        Clear data in specified range
        
        Args:
            range_name: Range to clear
            
        Returns:
            Response from API
        """
        try:
            sheet = self.service.spreadsheets()
            result = sheet.values().clear(
                spreadsheetId=self.sheet_id,
                range=range_name,
                body={}
            ).execute()
            
            logger.info(f"Successfully cleared data in {range_name}")
            return result
            
        except HttpError as e:
            logger.error(f"Failed to clear data in {range_name}: {e}")
            return {}
    
    def batch_get(self, ranges: List[str]) -> Dict[str, List[List[str]]]:
        """
        Get data from multiple ranges in a single request
        
        Args:
            ranges: List of ranges to read
            
        Returns:
            Dictionary mapping range names to their data
        """
        try:
            sheet = self.service.spreadsheets()
            result = sheet.values().batchGet(
                spreadsheetId=self.sheet_id,
                ranges=ranges,
                valueRenderOption='UNFORMATTED_VALUE'
            ).execute()
            
            batch_data = {}
            for i, value_range in enumerate(result.get('valueRanges', [])):
                range_name = ranges[i]
                batch_data[range_name] = value_range.get('values', [])
            
            logger.info(f"Successfully read {len(ranges)} ranges in batch")
            return batch_data
            
        except HttpError as e:
            logger.error(f"Failed to batch get data: {e}")
            return {}
    
    def get_data_stats(self, range_name: str = "Data!A1:Z1000") -> Dict[str, Any]:
        """
        Get statistics about the data in specified range
        
        Args:
            range_name: Range to analyze
            
        Returns:
            Dictionary with data statistics
        """
        data = self.read_as_dict(range_name)
        if not data:
            return {'total_rows': 0, 'columns': [], 'last_updated': datetime.now().isoformat()}
        
        stats = {
            'total_rows': len(data),
            'columns': list(data[0].keys()) if data else [],
            'last_updated': datetime.now().isoformat()
        }
        
        # Calculate numeric statistics if possible
        numeric_columns = []
        for col in stats['columns']:
            try:
                values = [float(row[col]) for row in data if row[col] and str(row[col]).replace('.', '').replace('-', '').isdigit()]
                if values:
                    numeric_columns.append(col)
                    stats[f'{col}_stats'] = {
                        'count': len(values),
                        'sum': sum(values),
                        'average': sum(values) / len(values),
                        'min': min(values),
                        'max': max(values)
                    }
            except (ValueError, TypeError):
                continue
        
        stats['numeric_columns'] = numeric_columns
        return stats
    
    def create_sample_data(self):
        """Create sample data for testing"""
        headers = ['Date', 'Product', 'Sales', 'Revenue', 'Region', 'Status']
        sample_data = [
            headers,
            ['2024-01-01', 'Product A', '100', '5000', 'North', 'Active'],
            ['2024-01-02', 'Product B', '150', '7500', 'South', 'Active'],
            ['2024-01-03', 'Product C', '80', '4000', 'East', 'Pending'],
            ['2024-01-04', 'Product D', '200', '10000', 'West', 'Active'],
            ['2024-01-05', 'Product E', '120', '6000', 'North', 'Completed'],
            ['2024-01-06', 'Product F', '90', '4500', 'South', 'Active'],
            ['2024-01-07', 'Product G', '170', '8500', 'East', 'Pending'],
            ['2024-01-08', 'Product H', '110', '5500', 'West', 'Active'],
            ['2024-01-09', 'Product I', '140', '7000', 'North', 'Completed'],
            ['2024-01-10', 'Product J', '95', '4750', 'South', 'Active']
        ]
        
        result = self.write_data('Data!A1:F11', sample_data)
        if result:
            logger.info("Sample data created successfully")
            return True
        return False

# Example usage
if __name__ == "__main__":
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv()
    
    try:
        # Initialize service
        sheets_service = GoogleSheetsService()
        
        # Get sheet info
        info = sheets_service.get_sheet_info()
        print(f"Sheet Title: {info.get('title')}")
        print(f"Available Sheets: {info.get('sheets')}")
        
        # Read data
        data = sheets_service.read_as_dict('Data!A1:F100')
        print(f"Total rows: {len(data)}")
        
        # Get statistics
        stats = sheets_service.get_data_stats('Data!A1:F100')
        print(f"Statistics: {stats}")
        
    except Exception as e:
        print(f"Error: {e}")