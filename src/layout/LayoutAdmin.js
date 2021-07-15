import React from 'react'
import NavBar from '../components/admin/NavBar'
import SideBar from '../components/admin/SideBar'

const LayoutAdmin = ({ children }) => {
    return (
        <div className="flex">
            <SideBar />
            <div className="w-full bg-gray-200">
                <NavBar />
                <div className="mx-auto py-5 w-11/12 md:w-9/12 lg:w-11/12">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default LayoutAdmin
