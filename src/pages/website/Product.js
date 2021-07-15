import React, { useEffect, useState } from 'react'
import ProductApi from '../../api/productAPI';
import ListProduct from '../../components/website/ListProduct';
import Pagination from '../../components/Pagination'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
const Product = (props) => {
    const [listProduct, setListProduct] = useState([]);
    const [filters, setFilters] = useState({ _limit: 3, _page: 1 });
    const [pagination, setPagination] = useState({
        // _limit: 0,
        pageCount: 0,
        _page: 1,
        // _totalRows: 0
    });
    const handlePageClick = (newPage) => {
        setFilters({ ...filters, _page: newPage })
    }
    const sortSelect = async (e) => {
        const orderParse = queryString.parse(e.target.value)
        setFilters({ _limit: 3, _page: 1, ...orderParse })
    }
    useEffect(() => {
        const paramString = queryString.stringify(filters);
        const getListProduct = async () => {
            const { data } = await ProductApi.getAll(paramString);
            setListProduct(data.itemsList)
            setPagination({ pageCount: data.pageCount, _page: data.currentPage })
        }
        getListProduct()
    }, [filters])

    return (
        <>
            <div className="container">
                <div className="flex items-center justify-between py-5">
                    <div className="text-4xl text-white ">Products</div>
                    <div className="text-white"><span><Link className="main-text hover:main-text" to="/">Home</Link></span> / <span className="main-text-active">Products</span></div>
                </div>
                <div className="flex justify-between items-center py-5 border-b border-yellow">
                    <div className="flex">
                        <span className="text-white">Filter by | </span>
                        <select className="bg-transparent text-white focus:outline-none text-sm px-5" onChange={sortSelect}>
                            <option className="text-gray-500 text-sm" value=' '>--- Tất cả ---</option>
                            <option className="text-gray-500 text-sm" value="price_lte=300">Giá dưới 300</option>
                            <option className="text-gray-500 text-sm" value="price_gte=300&price_lte=600">Giá 300 -&gt; 600</option>
                            <option className="text-gray-500 text-sm" value="price_gte=600">Giá trên 600</option>
                            <option className="text-gray-500 text-sm" value="_sort=new_price&_order=-1">Giá giảm dần</option>
                            <option className="text-gray-500 text-sm" value="_sort=new_price&_order=1">Giá tăng dần</option>
                            <option className="text-gray-500 text-sm" value="_sort=name&_order=-1">Tên A -&gt; Z</option>
                            <option className="text-gray-500 text-sm" value="_sort=name&_order=1">Tên Z -&gt; A</option>
                        </select>
                    </div>
                    <div className="text-gray-500 text-sm">We found <span className="main-text-active">{listProduct.length} products</span> available for you</div>
                </div>
            </div>
            <ListProduct {...props} listProduct={listProduct} />
            <div className="container">
                <div className="flex justify-end pt-10">
                    <Pagination pagination={pagination} onPageClick={handlePageClick} />
                </div>

            </div>
        </>

    )
}

export default Product
