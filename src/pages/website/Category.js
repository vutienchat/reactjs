import React, { useEffect, useState } from 'react'
import ProductApi from '../../api/productAPI';
import { useParams, useLocation } from 'react-router-dom'
import ListProduct from '../../components/website/ListProduct';
import { customName } from '../../Util';
import { Link } from 'react-router-dom'
const Category = (props) => {
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    const categoryId = query.get('id')
    const { nameCategory } = useParams();
    const [listProduct, setListProduct] = useState([]);
    const sortSelect = async (e) => {
        const { data } = await ProductApi.getByCategory(categoryId, e.target.value)
        setListProduct(data)
    }
    useEffect(() => {
        const getList = async () => {
            const { data } = await ProductApi.getByCategory(categoryId)
            setListProduct(data)
        }
        getList();
    }, [categoryId])
    return (
        <>
            <div className="container">
                <div className="flex items-center justify-between py-5">
                    <div className="text-4xl text-white ">{customName(nameCategory)}</div>
                    <div className="text-white"><span><Link className="main-text hover:main-text" to="/">Home</Link></span> / <span className="main-text-active">{customName(nameCategory)}</span></div>
                </div>
                <div className="flex justify-between items-center py-5 border-b border-yellow">
                    <div className="flex">
                        <span className="text-white">Filter by | </span>
                        <select className="bg-transparent text-white focus:outline-none text-sm px-5" onChange={sortSelect}>
                            <option className="text-gray-500 text-sm" value=''>--- Tất cả ---</option>
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
        </>
    )
}

export default Category
