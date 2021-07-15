import React from 'react'

const Pagination = ({ pagination, onPageClick }) => {
    const { pageCount, _page } = pagination;
    // const totalPages = Math.ceil(_totalRows / _limit)
    const handlePageClick = (page) => {
        onPageClick(page)
    }
    const numberPage = (totalPages) => {
        const pagesArray = []
        for (let i = 0; i < totalPages; i++) {
            pagesArray.push(<button key={i} className={_page === i + 1
                ? "relative focus:outline-none block py-1.5 px-2.5 leading-tight border border-[#cebaa4]  border-r-0 main-bg-active text-white cursor-pointer"
                : "relative focus:outline-none block py-1.5 px-2.5 leading-tight bg-transparent border border-[#cebaa4] text-[#cebaa4] border-r-0 hover:main-bg hover:text-white cursor-pointer"} onClick={() => handlePageClick(i + 1)}>{i + 1}</button>)
        }
        return pagesArray
    }

    return (
        <div>
            <div className="flex pl-0 list-none rounded my-2">
                <button disabled={_page <= 1}
                    className="relative disabled:opacity-50 focus:outline-none block py-1.5 px-2.5 leading-tight bg-transparent border border-[#cebaa4] text-[#cebaa4] border-r-0 ml-0 rounded-l hover:main-bg hover:text-white"
                    onClick={() => handlePageClick(_page - 1)}
                > Previous</button>
                {numberPage(pageCount)}
                <button disabled={_page >= pageCount} className="disabled:opacity-50 relative focus:outline-none block py-1.5 px-2.5 leading-tight bg-transparent border border-[#cebaa4] text-[#cebaa4] rounded-r hover:main-bg hover:text-white" onClick={() => handlePageClick(_page + 1)}>Next</button>
            </div>
        </div>
    )
}

export default Pagination
