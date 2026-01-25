/**
 * Recharts Lazy Loader
 * Dynamically imports Recharts components only when needed
 * Prevents loading entire recharts library (100-150KB) on initial page load
 *
 * Usage:
 * const ChartComponents = await lazyLoadRecharts();
 * const { LineChart, BarChart, PieChart } = ChartComponents;
 */

/**
 * React Hook version for functional components
 * Lazy loads Recharts when component mounts
 *
 * Usage:
 * const ChartComponents = useLazyRecharts();
 * if (!ChartComponents) return <Spinner />;
 * const { LineChart, BarChart } = ChartComponents;
 */
import { useEffect, useState } from "react";

let chartsLibrary = null;

export async function lazyLoadRecharts() {
  if (chartsLibrary) return chartsLibrary;

  try {
    // Only load recharts when a chart component is about to be rendered
    const {
      LineChart,
      BarChart,
      PieChart,
      AreaChart,
      ScatterChart,
      RadarChart,
      Line,
      Bar,
      Pie,
      Area,
      Scatter,
      Radar,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      Legend,
      ResponsiveContainer,
      ComposedChart,
      RadialBarChart,
      RadialBar,
      PolarGrid,
      PolarAngleAxis,
      PolarRadiusAxis,
    } = await import("recharts");

    chartsLibrary = {
      LineChart,
      BarChart,
      PieChart,
      AreaChart,
      ScatterChart,
      RadarChart,
      Line,
      Bar,
      Pie,
      Area,
      Scatter,
      Radar,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      Legend,
      ResponsiveContainer,
      ComposedChart,
      RadialBarChart,
      RadialBar,
      PolarGrid,
      PolarAngleAxis,
      PolarRadiusAxis,
    };

    console.log("📦 Recharts library loaded");
    return chartsLibrary;
  } catch (error) {
    console.error("❌ Failed to load Recharts:", error.message);
    throw error;
  }
}

export function useLazyRecharts() {
  const [charts, setCharts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    lazyLoadRecharts()
      .then((lib) => {
        setCharts(lib);
      })
      .catch((err) => {
        console.error("Failed to load Recharts:", err);
        setError(err);
      });
  }, []);

  return { charts, error, isLoading: !charts && !error };
}

export default lazyLoadRecharts;
