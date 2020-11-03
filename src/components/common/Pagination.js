import React from "react";
import _ from "lodash";

const Pagination = ({ page, totalPage, onClickCurrentPage }) => {
    const { pageSize, currentPage } = page.pagination;
    const pageCount = Math.ceil(totalPage / pageSize);
    const pages = _.range(1, pageCount + 1);
    return (
        <div className="ui pagination menu">
            {pages.map((page) => (
                <div
                    key={page}
                    type="pageItem"
                    className={`item ${currentPage === page ? "active" : ""}`}
                    onClick={() => onClickCurrentPage(page)}
                >
                    {page}
                </div>
            ))}
        </div>
    );
};

export default React.memo(Pagination);
