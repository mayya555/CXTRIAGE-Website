import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Material Design 3 Button
export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "filled" | "outlined" | "text" | "tonal";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
  }
>(({ className, variant = "filled", size = "md", fullWidth, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    filled: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    outlined: "border border-outline text-primary hover:bg-primary/10",
    text: "text-primary hover:bg-primary/10",
    tonal: "bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80",
  };

  const sizes = {
    sm: "h-8 px-4 text-xs",
    md: "h-10 px-6 text-sm",
    lg: "h-12 px-8 text-base",
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";

// Material Design 3 Card
export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "elevated" | "filled" | "outlined";
  }
>(({ className, variant = "elevated", ...props }, ref) => {
  const variants = {
    elevated: "bg-surface-container-low shadow-md",
    filled: "bg-surface-container-highest",
    outlined: "bg-surface border border-outline-variant",
  };

  return (
    <div
      ref={ref}
      className={cn("rounded-xl p-4 text-on-surface", variants[variant], className)}
      {...props}
    />
  );
});
Card.displayName = "Card";

// Material Design 3 Input
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
  }
>(({ className, label, error, icon, ...props }, ref) => {
  return (
    <div className="w-full space-y-1">
      {label && <label className="text-xs font-medium text-on-surface-variant ml-3">{label}</label>}
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-t-lg border-b border-outline-variant bg-surface-container-highest px-4 py-2 text-sm text-on-surface ring-offset-surface placeholder:text-on-surface-variant/50 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            icon && "pl-10",
            error && "border-error",
            className
          )}
          {...props}
        />
        {icon && <div className="absolute left-3 top-3.5 text-on-surface-variant">{icon}</div>}
      </div>
      {error && <p className="text-xs text-error ml-3">{error}</p>}
    </div>
  );
});
Input.displayName = "Input";

// Badge/Chip
export const Badge = ({ children, variant = "primary", className }: { children: React.ReactNode, variant?: "primary" | "secondary" | "success" | "warning" | "error" | "outline", className?: string }) => {
  const variants = {
    primary: "bg-primary-container text-on-primary-container",
    secondary: "bg-secondary-container text-on-secondary-container",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    error: "bg-error-container text-on-error-container",
    outline: "border border-outline text-on-surface-variant",
  };
  
  return (
    <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-black/5", variants[variant], className)}>
      {children}
    </span>
  );
};

export const Switch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) => (
  <button 
    onClick={() => onCheckedChange(!checked)}
    className={cn(
      "w-12 h-7 rounded-full transition-colors relative flex-shrink-0",
      checked ? "bg-primary" : "bg-slate-300"
    )}
  >
    <div className={cn(
      "w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm",
      checked ? "left-6" : "left-1"
    )} />
  </button>
);
