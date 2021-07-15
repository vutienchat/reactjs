import React, { useEffect, useState } from 'react'
import ProductApi from '../../../api/productAPI'
import ListProduct from '../ListProduct'
const Related = ({ productid }) => {
    const [listRalated, setListRalated] = useState([])
    useEffect(() => {
        const getRalated = async () => {
            try {
                const { data } = await ProductApi.getRalated(productid);
                setListRalated(data)
            } catch (error) {
                console.log(error);
            }
        }
        getRalated();
    }, [productid])
    return (
        <>
            <div className="text-3xl text-white py-8">
                Ralated Products
        </div>
            <ListProduct listProduct={listRalated} />
        </>
    )
}

export default Related
