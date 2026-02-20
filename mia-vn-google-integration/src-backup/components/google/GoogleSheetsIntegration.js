//GoogleSheetsIntegration.js

import { useEffect, useState } from "react";
import { fetchGoogleSheetsData } from "../../services/googleSheetsService";
import Loading from "../common/Loading";

const GoogleSheetsIntegration = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchGoogleSheetsData();
        setData(result);
      } catch (err) {
        setError("Failed to load Google Sheets data.");
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
      <h1 className="text-2xl font-bold mb-4">Google Sheets Integration</h1>
      {/* Render your Google Sheets data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default GoogleSheetsIntegration;
