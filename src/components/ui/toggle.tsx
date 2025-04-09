import { cn } from "~/utils/cn";
import { type InputHTMLAttributes, forwardRef } from "react";

interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex cursor-pointer items-center gap-2">
        <div className="relative inline-block">
          <input type="checkbox" className="sr-only" ref={ref} {...props} />
          <div
            className={cn(
              "block h-6 w-12 rounded-full",
              props.checked ? "bg-cyan-400" : "bg-slate-700",
            )}
          />
          <div
            className={cn(
              "absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform",
              props.checked && "translate-x-6",
            )}
          />
        </div>
        {label && <span className="text-sm text-slate-300">{label}</span>}
      </label>
    );
  },
);

Toggle.displayName = "Toggle";

export { Toggle, type ToggleProps };
