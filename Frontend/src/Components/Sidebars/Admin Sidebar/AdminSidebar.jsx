import './AdminSidebar.css'
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {

    return (

        <>
            <aside className="admin-sidebar">

                <NavLink to="/admin" end>
                    Dashboard
                </NavLink>

                <NavLink to="/admin/banners">
                    Banners
                </NavLink>

                <NavLink to="/admin/food-categories">
                    Food Categories
                </NavLink>

            </aside>
        </>

    )

}

export default AdminSidebar