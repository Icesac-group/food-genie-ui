import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base styles
        "flex w-full min-h-[80px] rounded-lg border border-gray-200 bg-white px-4 py-3",
        "font-campton text-sm text-gray-800",
        "placeholder:text-gray-400",
        "shadow-sm",
        "transition-colors duration-200",
        "resize-none",

        // Focus styles with orange ring
        "focus:outline-none",
        "focus:border-gray-200",
        "focus:ring-1",
        "focus:ring-gray-200",

        // Invalid/Error styles with red ring
        "aria-[invalid=true]:border-red-500",
        "aria-[invalid=true]:focus:ring-red-500/20",

        // Disabled styles
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",

        className
      )}
      {...props}
    />
  );
}

export { Textarea };
