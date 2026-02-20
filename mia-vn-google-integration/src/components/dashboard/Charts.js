//Charts.js

import React, { Suspense } from "react";

const LineChart = React.lazy(() =>
  import("recharts").then((module) => ({ default: module.LineChart }))
);
const BarChart = React.lazy(() =>
  import("recharts").then((module) => ({ default: module.BarChart }))
);
const PieChart = React.lazy(() =>
  import("recharts").then((module) => ({ default: module.PieChart }))
);

export const DashboardCharts = () => (
  <Suspense fallback={<div>Loading charts...</div>}>
    <LineChart {...props} />
    <BarChart {...props} />
    <PieChart {...props} />
  </Suspense>
);
