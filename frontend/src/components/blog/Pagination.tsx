import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Logic to limit visible page numbers (show 5 at most)
  const getPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    if (currentPage > 3) {
      pages.push(1);
      if (currentPage > 4) {
        pages.push('...');
      }
    }
    
    // Calculate range around current page
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Always show last page
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center mt-12">
      <nav className="inline-flex items-center rounded-lg overflow-hidden shadow-sm">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-5 py-3 border-r border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-orange transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Previous
        </button>

        <div className="hidden md:flex">
          {getPageNumbers().map((page, index) => 
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`w-12 h-12 flex items-center justify-center text-sm transition-colors ${
                  page === currentPage
                    ? "bg-orange/10 text-orange font-medium"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="w-12 h-12 flex items-center justify-center text-sm text-gray-400">
                {page}
              </span>
            )
          )}
        </div>
        
        <div className="md:hidden px-4 py-3 bg-white text-sm">
          Page {currentPage} of {totalPages}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-5 py-3 border-l border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-orange transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center"
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;