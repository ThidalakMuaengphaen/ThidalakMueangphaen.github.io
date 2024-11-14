import React from "react";

const PaginatedPage = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPage = (page) => {
    onPageChange(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    // <div className="flex">
    //   <span className="mx-auto font-semibold md:text-2xl">Page :</span>
    //   {pageNumbers.map((page) => (
    //     <button key={page} onClick={() => onPageChange(page)} className={`mx-2 font-semibold md:text-2xl ${currentPage === page && `text-red-600`}`}>
    //       {page}
    //     </button>
    //   ))}
    // </div>
    <div>
      {pageNumbers.length === 1 ? (
        <div className="w-16 h-16 rounded-full flex justify-center items-center bg-[#419DBB]">
          {pageNumbers.map((page) => (
            // <button key={page} onClick={() => onPageChange(page)} className={`mx-2 font-semibold md:text-2xl ${currentIndex === page && "text-white"}`}>
            <button key={page} onClick={() => onPageChange(page)} className={`mx-2 font-semibold md:text-2xl ${currentPage === page && "text-white"}`}>
              {page}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex gap-5">
          {/* className={`p-3 mr-2 rounded-lg ${currentIndex === 0 ? "bg-gray-400 text-black" : "bg-[#F27F0C] text-white"}`} disabled={currentIndex === 0 */}
          <button onClick={goToPrevious} disabled={currentPage === 1} className={`w-20 md:w-36 ${currentPage === 1 ? "bg-gray-400 text-black" : "bg-[#419DBB]"} text-white rounded-2xl md:rounded-full`}>
            <span className="text-lg md:text-2xl font-bold">ก่อนหน้า</span>
          </button>
          <div className="flex gap-4">
            {pageNumbers.map((page) => (
              <button key={page} onClick={() => onPageChange(page)} className={`w-10 h-10 md:w-16 md:h-16 rounded-full flex justify-center text-white items-center ${currentPage === page ? "bg-[#419DBB]" : "bg-[#83BFD3]"}`}>
                {page}
              </button>
            ))}
          </div>
          <button onClick={goToNext} disabled={currentPage === pageNumbers.length} className={`w-20 md:w-36 ${currentPage === pageNumbers.length ? "bg-gray-400 text-black" : "bg-[#419DBB]"} text-white rounded-2xl md:rounded-full`}>
            <span className="text-lg md:text-2xl font-bold">ถัดไป</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginatedPage;
