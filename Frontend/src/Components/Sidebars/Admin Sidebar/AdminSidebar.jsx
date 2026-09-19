/* eslint-disable no-unused-vars */
import { FiCoffee, FiGrid, FiImage } from 'react-icons/fi';
import './AdminSidebar.css'
import { NavLink } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
import { useState } from 'react';
import { ClipboardList, LayoutDashboard, Pizza, Store } from 'lucide-react';


const AdminSidebar = (props) => {

    // destructure props
    const { panel } = props

    // state to store sidevar show hide status
    const [showSidebar, setShowSidebar] = useState(true);

    // function to toggle sidebar
    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    return (

        <>
            <aside className="admin-sidebar">

                {/* sidebar toggle button */}
                {/* <div
                    className="sidebarToggle"
                    onClick={toggleSidebar}
                >

                    {showSidebar ? (
                        <div className="close toggleIcon">
                            <IoCloseSharp />
                        </div>
                    ) : (
                        <div className="open toggleIcon">
                            <RiMenu2Line />
                        </div>
                    )}

                </div> */}

                <nav className="sidebar-nav">

                    {panel === "admin" && (

                        <>
                            <NavLink to="/admin" end className="sidebar-link">
                                <FiGrid className="sidebar-icon" />
                                <span className="sidebar-text">Dashboard</span>
                            </NavLink>

                            <NavLink to="/admin/banners" className="sidebar-link">
                                <FaImage className="sidebar-icon" />
                                <span className="sidebar-text">Banners</span>
                            </NavLink>

                            <NavLink to="/admin/food-categories" className="sidebar-link">
                                <FiCoffee className="sidebar-icon" />
                                <span className="sidebar-text">Food Categories</span>
                            </NavLink>
                        </>
                    )}

                    {panel === "restaurant" && (
                        <>
                            {/* restaurant dashboard */}
                            <NavLink to="/restaurant/admin-panel" end className="sidebar-link">
                                <LayoutDashboard className="sidebar-icon" />
                                <span>Dashboard</span>
                            </NavLink>

                            {/* my restaurant */}
                            <NavLink to="/restaurant/admin-panel/my-restaurant" className="sidebar-link">
                                <Store className="sidebar-icon" />
                                <span>My Restaurant</span>
                            </NavLink>

                            {/* food items */}
                            <NavLink to="/restaurant/admin-panel/food-items" className="sidebar-link">
                                <Pizza className="sidebar-icon" />
                                <span>Food Items</span>
                            </NavLink>

                            {/* orders */}
                            <NavLink to="/restaurant/admin-panel/orders" className="sidebar-link">
                                <ClipboardList className="sidebar-icon" />
                                <span>Orders</span>
                            </NavLink>
                        </>
                    )}

                </nav>

            </aside>
        </>

    )

}

export default AdminSidebar