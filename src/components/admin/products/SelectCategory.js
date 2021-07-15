import React, { useEffect, useState } from 'react'
import categoryApi from '../../../api/categoryAPI'
import { customName } from '../../../Util'

const SelectCategory = (props) => {
    const { _id } = props.editId ? props.editId : '';
    const [listCategory, setListCategory] = useState([])
    useEffect(() => {
        const getListCategory = async () => {
            const { data } = await categoryApi.getAll();
            setListCategory(data);
        }
        getListCategory()
    }, [_id])
    return (
        <>
            <option hidden>--- Chọn danh mục ---</option>
            {listCategory.map(((category, i) => {
                return (
                    // category._id === _id ?
                    <option key={i} value={category._id}>{customName(category.name)}</option>
                    //  <option key={i} value={category._id}>{customName(category.name)}</option>

                )
            }))}
        </>
    )
}

export default SelectCategory
