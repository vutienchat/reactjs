import React, { useEffect, useState } from 'react'
import OrderAPI from '../../../api/OrderAPI';
import { Link } from 'react-router-dom'
const ListOrder = () => {
    const [listOrder, setListOrder] = useState([]);
    useEffect(() => {
        const getOrder = async () => {
            try {
                const { data } = await OrderAPI.getAll();
                setListOrder(data)
            } catch (error) {
                console.log(error);
            }
        }
        getOrder()
    }, [])
    return (
        <table className="w-full fade">
            <thead>
                <tr className="bg-white text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 font-medium">#</th>
                    <th className="py-3 px-6 font-medium">Name</th>
                    <th className="py-3 px-6 font-medium">Phone</th>
                    <th className="py-3 px-6 font-medium">Address</th>
                    <th className="py-3 px-6 font-medium">Email</th>
                    <th className="py-3 px-6 font-medium">Amount</th>
                    <th className="py-3 px-6 font-medium">Total</th>
                    <th className="py-3 px-6 font-medium">Action</th>
                </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
                {listOrder.map((orderItem, index) => {
                    return <tr className="border-b border-gray-200 bg-white hover:bg-gray-100">
                        <td className="py-3 px-6 whitespace-nowrap font-medium">{index + 1}</td>
                        <td className="py-3 px-6">{orderItem.name}</td>
                        <td className="py-3 px-6">{orderItem.phone}</td>
                        <td className="py-3 px-6">{orderItem.address}</td>
                        <td className="py-3 px-6">{orderItem.email}</td>
                        <td className="py-3 px-6">{orderItem.quantity}</td>
                        <td className="py-3 px-6">{orderItem.total}</td>
                        <td className="py-3 px-6">
                            <Link to={`/admin/order/${orderItem._id}`}>
                                <button className="focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-500 hover:text-white">
                                    Chi Tiết
                                </button>
                            </Link>
                        </td>
                    </tr>
                })
                }
            </tbody>
        </table>
    )
}

export default ListOrder
