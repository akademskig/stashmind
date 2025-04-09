import { cn } from "~/utils/cn";
import { type HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, active = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border transition-all",
          active
            ? "border-cyan-400/50 bg-slate-900/80 shadow-[0_0_10px_rgba(56,189,248,0.2)]"
            : "border-slate-700/50 bg-slate-900/40 hover:border-cyan-500/80",
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

export { Card, type CardProps };
