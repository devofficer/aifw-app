import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import styles from "./Pagination.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IPaginationProps {
  totalItemCount: number;
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({
  totalItemCount,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}: IPaginationProps) => {
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    const pageCnt = Math.ceil(totalItemCount / itemsPerPage);
    setTotalPages(pageCnt);
  }, [totalItemCount]);

  useEffect(() => {
    console.log(currentPage);
    let startPage = Math.max(currentPage - 3, 1);
    let endPage = Math.min(startPage + 5, totalPages);
    startPage = Math.max(endPage - 5, 1);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    setPageNumbers(pageNumbers);
  }, [currentPage, totalPages]);

  const handleSetPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.outerDiv}>
      <div className={styles.innerDiv1}>
        <div>
          <p className={styles.text}>
            Showing <span className={styles.fontMedium}>{currentPage}</span> of{" "}
            <span className={styles.fontMedium}>{totalPages}</span> pages
          </p>
        </div>
        <div>
          <nav className={styles.paginationNav} aria-label="Pagination">
            <a
              href="#"
              onClick={() => {
                if (currentPage > 1) handleSetPage(currentPage - 1);
              }}
              className={`${styles.actionButton} ${
                currentPage === 1 ? styles.disabled : ""
              }`}
            >
              <ChevronLeftIcon className={styles.icon} aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            {pageNumbers.map((page, idx) => {
              return (
                <a
                  key={idx}
                  href="#"
                  aria-current="page"
                  onClick={() => handleSetPage(page)}
                  className={
                    page === currentPage
                      ? styles.currentPage
                      : styles.pageButton
                  }
                >
                  {page}
                </a>
              );
            })}
            <a
              href="#"
              onClick={() => {
                if (currentPage < totalPages) handleSetPage(currentPage + 1);
              }}
              className={`${styles.actionButton} ${
                currentPage === totalPages ? styles.disabled : ""
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className={styles.icon} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
