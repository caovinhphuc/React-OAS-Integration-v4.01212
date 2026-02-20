//AIDashboard.js

import { useEffect, useState } from "react";
import { fetchAIDashboardData } from "../../services/aiService";
import Loading from "../common/Loading";

const AIDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchAIDashboardData();
        setData(result);
      } catch (err) {
        setError("Failed to load AI dashboard data.");
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
      <h1 className="text-2xl font-bold mb-4">AI Dashboard</h1>
      {/* Render your AI dashboard data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default AIDashboard;
