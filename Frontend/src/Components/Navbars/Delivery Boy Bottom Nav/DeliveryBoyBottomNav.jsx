import { NavLink } from "react-router-dom";
import { LuHouse, LuClipboardList, LuIndianRupee, LuUserRound } from "react-icons/lu";
import "./DeliveryBoyBottomNav.css";

const navItems = [
    {
        label: "Home",
        path: "/delivery-boy",
        icon: LuHouse,
        end: true
    },
    {
        label: "My Orders",
        path: "/delivery-boy/my-orders",
        icon: LuClipboardList
    },
    {
        label: "Earnings",
        path: "/delivery-boy/earnings",
        icon: LuIndianRupee
    },
    {
        label: "Profile",
        path: "/delivery-boy/profile",
        icon: LuUserRound
    }
];

const DeliveryBoyBottomNav = () => {
    return (
        <nav className="delivery-boy-bottom-nav">

            {navItems.map(({ label, path, icon: Icon, end }) => (

                <NavLink
                    key={path}
                    to={path}
                    end={end}
                    className={({ isActive }) =>
                        `delivery-boy-nav-item ${isActive ? "active" : ""}`
                    }
                >

                    <Icon className="delivery-boy-nav-icon" />
                    <span>{label}</span>

                </NavLink>
            ))}

        </nav>
    );
};

export default DeliveryBoyBottomNav;