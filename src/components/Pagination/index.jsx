import "./Pagination.css";

function Pagination({
  countItems,
  totalItems,
  filteredItems,
  paginate,
  currentPage = 1,
  maxPages = 5,
}) {
  const totalPages = Math.ceil(totalItems / countItems)
  const halfMaxPages = Math.floor(maxPages / 2)
  let startPage = 1
  let endPage = totalPages

  if (totalPages < maxPages) {
    maxPages = totalPages
  } else if (currentPage <= halfMaxPages) {
    endPage = maxPages
  } else if (currentPage + halfMaxPages >= totalPages) {
    startPage = totalPages - maxPages + 1;
  } else {
    startPage = currentPage - halfMaxPages;
    endPage = currentPage + halfMaxPages;
  }
  
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )
  return (
    <div className="pagination1">
      <div className="pagination">
        <div className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
          <div onClick={() => paginate(currentPage - 1)} className="page-link page-link1 rozmir">
            Назад
          </div>
        </div>
        {totalPages < maxPages ? (
          <div className="page-item">
            <div className="page-link">{totalPages}</div>
          </div>
        ) : (
          pageNumbers.map((number) => (
            <div
              key={number}
              className={`page-item ${number === currentPage ? "active" : ""}`}
            >
              <div onClick={() => paginate(number)} className="page-link">
                {number}
              </div>
            </div>
          ))
        )}
        <div
          className={`page-item ${currentPage >= totalPages ? "disabled" : ""}`}
        >
          <div onClick={() => paginate(currentPage + 1)} className="page-link page-link2 rozmir">
            Вперед
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination;