//AlertsManagement.js

import { useEffect, useState } from "react";
import Loading from "../common/Loading";

const AlertsManagement = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the alerts management
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Alerts Management</h1>
      {/* Render your alerts management UI here */}
      <p>This is where you can manage your alerts.</p>
    </div>
  );
};

export default AlertsManagement;
