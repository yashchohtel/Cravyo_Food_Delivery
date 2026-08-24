import { useLocation } from 'react-router-dom';
import './AdminPanelTopNavbar.css'
import { useSelector } from 'react-redux';
import { FiUser } from "react-icons/fi";
import { useState } from 'react';

const AdminPanelTopNavbar = () => {

    // initilize user location
    const location = useLocation();

    // Get auth state from Redux store
    const { user } = useSelector((state) => state.auth);

    // state to set profile image error
    const [isProfileImageError, setIsProfileImageError] = useState(false);

    // lookup object for page names
    const pageNames = {
        "/admin": "Dashboard",
        "/admin/banners": "Banners",
        "/admin/food-categories": "Food Categories",
    };

    // get current page name
    const currentPage = pageNames[location.pathname] || "Admin";

    return (

        <>
            <nav className="admin-navbar container">

                {/* Left */}
                <div className="navbar-left">

                    <div className="navbar-logo">
                        <img src="/logosmall.png" alt="Cravyo" />
                    </div>

                    <div className="navbar-page">
                        <h2>{currentPage}</h2>
                    </div>

                </div>


                {/* Right */}
                <div className="navbar-right">

                    {/* Admin Profile */}
                    <button className="admin-options-btn">

                        {/* Profile */}
                        <div className="icon-btn">

                            {user?.profileImage && !isProfileImageError ? (
                                <img
                                    src={user.profileImage}
                                    alt={user.fullName}
                                    className="profile-image"
                                    onError={() => setIsProfileImageError(true)}
                                />
                            )
                                : (<FiUser />)
                            }

                        </div>

                        {/* Admin Info */}
                        <div className="admin-info">

                            <span className="admin-name">
                                {user?.fullName || "Admin"}
                            </span>

                            <span className="more-options-text">
                                More Options
                            </span>

                        </div>

                    </button>

                </div>

            </nav>
        </>

    )

}

export default AdminPanelTopNavbar;