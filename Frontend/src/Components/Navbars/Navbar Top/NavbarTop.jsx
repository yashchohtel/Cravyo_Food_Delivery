import './NavbarTop.css'
import { useSelector } from 'react-redux';
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosArrowForward } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";
import { FiUser } from "react-icons/fi";

const NavbarTop = () => {

  // Get auth state from Redux store
  const { user } = useSelector((state) => state.auth);
  
  /* -------------------------------------- */

  return (

    <>

      {/* top navbar */}
      <header className="top-navbar">

        {/* Left Section */}
        <button className="navbar-left location">

          {/* location top */}
          <div className="locationTop">

            {/* Location Icon */}
            <span className="location-icon">
              <FaLocationDot />
            </span>

            <p className="destination">Deliver to <IoIosArrowForward /> </p>

          </div>

          {/* location text */}
          <p className="address">Sector 24, Palki Nagar...</p>

        </button>

        {/* Right Section */}
        <div className="navbar-right">

          {/* Cart */}
          <button className="icon-btn cart-btn">

            <FiShoppingBag />

            {/* Cart Count */}
            <span className="cart-badge">
              2
            </span>

          </button>

          {/* Profile */}
          <button className="icon-btn">

            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.fullName}
                className="profile-image"
              />
            ) : (
              <FiUser />
            )}

          </button>

        </div>

      </header>

    </>

  )

}

export default NavbarTop