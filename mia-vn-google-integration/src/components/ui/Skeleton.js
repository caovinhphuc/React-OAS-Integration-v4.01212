// src/components/ui/Skeleton.js
import "./Skeleton.css";

export const Skeleton = ({ width = "100%", height = "20px", variant = "text", className = "" }) => {
  return <div className={`skeleton skeleton--${variant} ${className}`} style={{ width, height }} />;
};

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <Skeleton variant="rect" height="200px" className="skeleton-card__image" />
    <div className="skeleton-card__content">
      <Skeleton width="60%" height="24px" />
      <Skeleton width="100%" height="16px" />
      <Skeleton width="80%" height="16px" />
    </div>
  </div>
);
