//GoogleDriveIntegration.js

import { useEffect, useState } from "react";
import { fetchGoogleDriveData } from "../../services/googleDriveService";
import Loading from "../common/Loading";

const GoogleDriveIntegration = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchGoogleDriveData();
        setData(result);
      } catch (err) {
        setError("Failed to load Google Drive data.");
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
      <h1 className="text-2xl font-bold mb-4">Google Drive Integration</h1>
      {/* Render your Google Drive data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default GoogleDriveIntegration;
