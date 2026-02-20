//MIARetailDashboard.js

import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import GoogleDriveIntegration from "../google/GoogleDriveIntegration";
import GoogleSheetsIntegration from "../google/GoogleSheetsIntegration";

const MIARetailDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the dashboard
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">MIA Retail Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GoogleDriveIntegration />
        <GoogleSheetsIntegration />
      </div>
    </div>
  );
};

export default MIARetailDashboard;
