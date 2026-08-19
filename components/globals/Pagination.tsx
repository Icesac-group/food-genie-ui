"use client";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near the start
        pages.push(2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push("...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        // In the middle
        pages.push("...", currentPage, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-0 bg-white rounded-xl shadow-md overflow-hidden w-fit mx-auto">
      {/* Previous Button */}
              <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-6 py-3 font-campton text-base transition-colors min-h-[44px] ${
          currentPage === 1
            ? "text-gray-300 cursor-not-allowed bg-white"
            : "text-[#FF7C36] hover:bg-orange-50 active:bg-orange-100 bg-white"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <div
            key={`ellipsis-${index}`}
            className="px-2 py-2 text-[#FF7C36] font-campton text-xl font-bold bg-white"
          >
            •••
          </div>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`min-w-[44px] min-h-[44px] px-2 py-2 font-campton text-base transition-colors ${
              currentPage === page
                ? "bg-[#FF7C36] text-white font-medium"
                : "bg-white text-[#9B9B9B] hover:bg-orange-50 active:bg-orange-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-6 py-3 font-campton text-base transition-colors min-h-[44px] ${
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed bg-white"
            : "text-[#FF7C36] hover:bg-orange-50 active:bg-orange-100 bg-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
