import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto max-w-7xl px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-2xl lg:max-w-none">{children}</div>
    </div>
  );
} 