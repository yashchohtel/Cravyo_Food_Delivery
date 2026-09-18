import AdminPanelTopNavbar from '../../../Components/Navbars/Admin Panel Top Navbar/AdminPanelTopNavbar'
import AdminSidebar from '../../../Components/Sidebars/Admin Sidebar/AdminSidebar'
import './RestaurantOwnerAdminPenal.css'

const RestaurantOwnerAdminPenal = () => {

  return (

    <>

      {/* resturant owner dashbord page layout */}
      <div className="admin-layout ResturantOwnerAdminLayout">

        {/* admin panel top navbar */}
        <AdminPanelTopNavbar />

        {/* resturant owner dashboar body */}
        <div className="admin-body container">

          {/* sidebar */}
          <AdminSidebar />

          <main className="admin-content">
           
           

          </main>

        </div>

      </div>

    </>

  )

}

export default RestaurantOwnerAdminPenal