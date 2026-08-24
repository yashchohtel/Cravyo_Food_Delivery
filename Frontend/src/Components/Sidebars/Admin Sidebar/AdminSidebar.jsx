import { FiCoffee, FiGrid, FiImage } from 'react-icons/fi';
import './AdminSidebar.css'
import { NavLink } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from 'react';


const AdminSidebar = () => {

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
                <div
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

                </div>

                <nav className="sidebar-nav">

                    <NavLink
                        to="/admin"
                        end
                        className={`sidebar-link ${showSidebar ? "" : "activeLink"}`}
                    >
                        <FiGrid className="sidebar-icon" />

                        <span className={`sidebar-text ${showSidebar ? "" : "activeText"}`}>
                            Dashboard
                        </span>

                    </NavLink>


                    <NavLink
                        to="/admin/banners"
                        className={`sidebar-link ${showSidebar ? "" : "activeLink"}`}
                    >
                        <FiImage className="sidebar-icon" />

                        <span className={`sidebar-text ${showSidebar ? "" : "activeText"}`}>
                            Banners
                        </span>

                    </NavLink>

                    <NavLink
                        to="/admin/food-categories"
                        className={`sidebar-link ${showSidebar ? "" : "activeLink"}`}
                    >
                        <FiCoffee className="sidebar-icon" />

                        <span className={`sidebar-text ${showSidebar ? "" : "activeText"}`}>
                            Food Categories
                        </span>

                    </NavLink>

                </nav>

            </aside>
        </>

    )

}

export default AdminSidebar