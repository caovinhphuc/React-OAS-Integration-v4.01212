//SecurityDashboard.js

import { useEffect, useState } from "react";
import Loading from "../common/Loading";

const SecurityDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the security dashboard
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Security Dashboard</h1>
      {/* Render your security dashboard UI here */}
      <p>This is where you can view and manage security-related information.</p>
    </div>
  );
};

export default SecurityDashboard;
