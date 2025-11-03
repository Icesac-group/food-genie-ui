import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2",
        "font-campton text-sm text-gray-800",
        "placeholder:text-gray-400",
        "shadow-sm",
        "transition-colors duration-200",

        // Focus styles with orange ring
        "focus:outline-none",
        "focus:border-gray-200",
        "focus:ring-1",
        "focus:ring-gray-100",

        // Invalid/Error styles with red ring
        "aria-[invalid=true]:border-red-500",
        "aria-[invalid=true]:focus:ring-red-500/20",

        // Disabled styles
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",

        // File input styles
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-700 file:mr-4",

        className
      )}
      {...props}
    />
  );
}

export { Input };
