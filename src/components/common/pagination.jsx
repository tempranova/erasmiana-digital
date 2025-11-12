export default function Pagination({
  currentPage,
  totalResults,
  resultsPerPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalResults / resultsPerPage)

  const startPage = Math.max(1, currentPage - 2)
  const endPage = Math.min(totalPages, currentPage + 2)

  const pages = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <div className="flex items-center gap-2">
      {/* Previous Page */}
      {currentPage > 1 && (
        <div
          onClick={() => onPageChange(currentPage - 1)}
          className="cursor-pointer px-2 py-1 text-gray-600 hover:text-black"
        >
          ‹
        </div>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <div
          key={page}
          onClick={() => onPageChange(page)}
          className={`border rounded-md text-sm px-2 py-1 bg-white/30 cursor-pointer hover:bg-white/20 ${
            page === currentPage
              ? 'font-semibold'
              : ''
          }`}
        >
          {page}
        </div>
      ))}

      {/* Next Page */}
      {currentPage < totalPages && (
        <div
          onClick={() => onPageChange(currentPage + 1)}
          className="cursor-pointer px-2 py-1 text-gray-600 hover:text-black"
        >
          ›
        </div>
      )}
    </div>
  )
}
