const Input = ({ label, id, error, className = "", ...props }) => {
      return (
            <div className="w-full">
                  {label && (
                        <label htmlFor={id} className="block text-sm font-medium text-foreground mb-2">
                              {label}
                        </label>
                  )}
                  <input
                        id={id}
                        className={`w-full px-4 py-2.5 bg-muted/50 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${error ? "border-red-500 focus:ring-red-500/50" : ""
                              } ${className}`}
                        {...props}
                  />
                  {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
      );
};

export default Input;
