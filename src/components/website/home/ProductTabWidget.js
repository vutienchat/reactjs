import React, { useState } from 'react'
import ProductApi from '../../../api/productAPI';
const ProductTabWidget = ({ listCategory, listByCategory, lisstFeatured }) => {
    const [onSelect, setOnSelect] = useState(1)
    const getByCategory = async (id) => {
        const { data } = await ProductApi.getByKey(`category=${id}`)
        listByCategory(data);
        setOnSelect(id)
    }
    const getByClassify = async (i) => {
        const { data } = await ProductApi.getByKey('classify=1')
        lisstFeatured(data)
        setOnSelect(i)
    }
    return (
        <div className="container pt-10  sm:pt-20">
            <div className="title-tab text-white text-2xl sm:text-5xl text-center">
                You want it? We got it.
        </div>
            <div className="menu-tab pt-5">
                <ul className="flex items-center justify-center flex-wrap">
                    <li ><span className={`main-text hover:main-text px-2 sm:px-5 cursor-pointer ${onSelect === 1 ? 'main-text-active' : ''}`} onClick={() => getByClassify(1)}>FEATURED</span></li>
                    {
                        listCategory.map(category => {
                            return <li key={category._id}><span className={`main-text hover:main-text px-2 sm:px-5 cursor-pointer ${onSelect === category._id ? 'main-text-active' : ''}`} onClick={() => getByCategory(category._id)}>{category.name.toUpperCase()}</span></li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default ProductTabWidget
