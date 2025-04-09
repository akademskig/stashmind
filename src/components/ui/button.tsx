import { cn } from "~/utils/cn";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:ring-1 focus-visible:ring-cyan-400 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-slate-800 text-white hover:bg-slate-700": variant === "default",
            "bg-cyan-600 text-white hover:bg-cyan-500": variant === "primary",
            "bg-slate-700 text-white hover:bg-slate-600":
              variant === "secondary",
            "text-slate-300 hover:bg-slate-800/50 hover:text-white":
              variant === "ghost",
            "h-9 w-9 rounded-md p-0": variant === "icon",
          },
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4": size === "md",
            "h-12 px-6 text-lg": size === "lg",
          },
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, type ButtonProps };
