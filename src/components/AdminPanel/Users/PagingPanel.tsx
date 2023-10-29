import React from "react";
import ArrowRightIcon from "../../../assets/icons/arrow-right-icon.svg";
import ArrowLeftIcon from "../../../assets/icons/arrow-left-icon.svg";
import "./paging-panel.scss";

type PagingPanelProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PagingPanel: React.FC<PagingPanelProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className="paging-panel-container__numbers-section__element"
        >
          <button
            className={`paging-panel-container__numbers-section__element__page-number paging-panel-container__numbers-section__element__page-number${
              currentPage === i ? "--active" : ""
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  const handleMinClick = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };
  const handleMaxClick = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="paging-panel-container">
      <button
        className="paging-panel-container__button"
        onClick={handleMinClick}
        disabled={currentPage === 1}
      >
        <img src={ArrowLeftIcon} alt="arrow left icon" width="30px" />
      </button>
      <button
        className="paging-panel-container__button"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        <img src={ArrowLeftIcon} alt="arrow left icon" width="30px" />
      </button>
      <ul className="paging-panel-container__numbers-section">
        {renderPageNumbers()}
      </ul>
      <button
        className="paging-panel-container__button"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        <img src={ArrowRightIcon} alt="arrow right icon" width="30px" />
      </button>
      <button
        className="paging-panel-container__button"
        onClick={handleMaxClick}
        disabled={currentPage === totalPages}
      >
        <img src={ArrowRightIcon} alt="arrow right icon" width="30px" />
      </button>
    </div>
  );
};

export default PagingPanel;
