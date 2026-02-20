//SmartAutomationDashboard.js

import { useEffect, useState } from "react";
import { fetchSmartAutomationData } from "../../services/smartAutomationService";
import Loading from "../common/Loading";

const SmartAutomationDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchSmartAutomationData();
        setData(result);
      } catch (err) {
        setError("Failed to load smart automation data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Smart Automation Dashboard</h1>
      {/* Render your smart automation data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default SmartAutomationDashboard;
