import React from 'react'
import { Link } from 'react-router-dom'
import FormOrder from '../../components/website/cart/FormOrder';
import InfoOrder from '../../components/website/cart/InfoOrder'
import ListCart from '../../components/website/cart/ListCart'
const CartPage = (props) => {
    const { listCart } = props;
    return (
        <div className="container">
            {listCart.length > 0 ?
                <>
                    <h2 className="text-center text-3xl py-8 text-[#2c2c2c]">GIỎ HÀNG CỦA BẠN</h2>
                    <ListCart {...props} />
                    <div className="flex items-center">
                        <Link to="/">
                            <button className="focus:outline-none text-white text-sm py-3 px-5 rounded-md border border-white hover:bg-[#cebaa4]  duration-500  hover:border-[#cebaa4] flex items-center" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                                Tiếp tục xem Sản Phẩm</button>
                        </Link>
                        <button className="focus:outline-none text-white text-sm py-3.5 px-5 rounded-md main-bg-active hover:bg-[#cebaa4] hover:shadow-lg ml-2  duration-500" type="button">Cập nhật giỏ hàng</button>
                    </div>
                    <div className="mb-8">
                        <div className="text-2xl my-4 font-semibold text-[#2c2c2c]">THÔNG TIN KHÁCH HÀNG</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormOrder {...props} />
                            <InfoOrder {...props} />
                        </div>
                    </div>
                </>
                : <div className="text-center my-7">
                    <div className="text-3xl text-white">Shopping Cart</div>
                    <p className="text-[#707070] mt-10 mb-5">Your cart is currently empty.</p>
                    <p className="w-full flex justify-center">
                        <Link to="/">
                            <button className="flex items-center focus:outline-none text-white text-sm py-3.5 px-9 main-bg-active hover:bg-[#cebaa4] hover:shadow-lg ml-2  duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                                <span className="pl-3">Continue shopping</span>
                            </button>
                        </Link>
                    </p>
                </div>}
        </div >
    )
}

export default CartPage
