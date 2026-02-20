// src/components/ui/Card.js
import "./Card.css";

export const Card = ({
  children,
  variant = "default",
  hover = false,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`
        modern-card
        modern-card--${variant}
        ${hover ? "modern-card--hover" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => (
  <div className={`modern-card__header ${className}`}>{children}</div>
);

export const CardBody = ({ children, className = "" }) => (
  <div className={`modern-card__body ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = "" }) => (
  <div className={`modern-card__footer ${className}`}>{children}</div>
);
