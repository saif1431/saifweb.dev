const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default:
      "border border-primary/40 text-primary bg-transparent",
    solid:
      "bg-primary/10 text-primary border border-primary/20",
    muted:
      "bg-muted/50 text-muted-foreground border border-border",
    success:
      "border border-success/40 text-success bg-transparent",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-mono rounded-md font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
