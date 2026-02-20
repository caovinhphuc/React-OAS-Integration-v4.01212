// src/utils/performance.js
export const measurePerformance = (componentName) => {
  if (process.env.NODE_ENV === "development") {
    const start = performance.now();

    return () => {
      const end = performance.now();
      const duration = end - start;

      if (duration > 16) {
        // More than one frame
        console.warn(`⚠️ ${componentName} took ${duration.toFixed(2)}ms to render`);
      }
    };
  }

  return () => {};
};
