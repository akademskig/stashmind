import { Loader2 } from "lucide-react";
import { cn } from "~/utils/cn";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  fullPage?: boolean;
}

export function Loader({ size = "md", className, fullPage = false }: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const Wrapper = fullPage ? "div" : "span";

  return (
    <Wrapper
      className={cn(
        "flex items-center justify-center",
        {
          "h-screen": fullPage,
          "h-64": !fullPage,
        },
        className,
      )}
    >
      <Loader2
        className={cn(
          "animate-spin text-cyan-500",
          sizeClasses[size],
          className,
        )}
      />
    </Wrapper>
  );
} 