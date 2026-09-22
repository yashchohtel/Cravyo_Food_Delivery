import { Outlet } from 'react-router-dom'
import AdminPanelTopNavbar from '../../../Components/Navbars/Admin Panel Top Navbar/AdminPanelTopNavbar'
import AdminSidebar from '../../../Components/Sidebars/Admin Sidebar/AdminSidebar'
import './RestaurantOwnerAdminPenal.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMyRestaurant } from '../../../features/restaurant dashboard/restaurant/restaurantThunk'
import { getAllFoodItems } from '../../../features/restaurant dashboard/foodItems/foodItemThunk'

const RestaurantOwnerAdminPenal = () => {

  // initialize use dispatch
  const dispatch = useDispatch();

  // effect to load restaurant
  useEffect(() => {

    // dispatch get restaurant
    dispatch(getMyRestaurant());

    // dispatch get food items
    dispatch(getAllFoodItems());

  }, [dispatch]);

  return (

    <>

      {/* resturant owner dashbord page layout */}
      <div className="admin-layout ResturantOwnerAdminLayout">

        {/* admin panel top navbar */}
        <AdminPanelTopNavbar />

        {/* resturant owner dashboar body */}
        <div className="admin-body container">

          {/* sidebar */}
          <AdminSidebar panel="restaurant" />

          <main className="admin-content">
            <Outlet />
          </main>

        </div>

      </div>

    </>

  )

}

export default RestaurantOwnerAdminPenal