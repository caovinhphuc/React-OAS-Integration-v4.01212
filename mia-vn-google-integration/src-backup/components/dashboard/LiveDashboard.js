//LiveDashboard.js

import { useEffect, useState } from "react";
import { fetchLiveDashboardData } from "../../services/dashboardService";
import Loading from "../common/Loading";

const LiveDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchLiveDashboardData();
        setData(result);
      } catch (err) {
        setError("Failed to load live dashboard data.");
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
      <h1 className="text-2xl font-bold mb-4">Live Dashboard</h1>
      {/* Render your live dashboard data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default LiveDashboard;
