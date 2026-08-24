import AdminPanelTopNavbar from '../../../Components/Navbars/Admin Panel Top Navbar/AdminPanelTopNavbar';
import AdminSidebar from '../../../Components/Sidebars/Admin Sidebar/AdminSidebar';
import './AdminPanel.css'
import { Outlet } from "react-router-dom";

const AdminPanel = () => {

    return (

        <>
            {/* admin page layout */}
            <div className="admin-layout">

                {/* admin panel top navbar */}
                <AdminPanelTopNavbar />

                <div className="admin-body container">

                    <AdminSidebar />

                    <main className="admin-content">
                        <Outlet />
                    </main>

                </div>

            </div>
        </>

    )
}

export default AdminPanel;