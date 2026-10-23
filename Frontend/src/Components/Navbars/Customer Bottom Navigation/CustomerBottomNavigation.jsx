import { NavLink } from "react-router-dom";
import {
    LuHouse,
    LuShoppingBag,
    LuShoppingCart,
    LuUserRound
} from "react-icons/lu";
import "./CustomerBottomNavigation.css";

const navigationItems = [
    {
        label: "Home",
        path: "/home",
        icon: LuHouse,
        end: true
    },
    {
        label: "My Orders",
        path: "/my-order",
        icon: LuShoppingBag
    },
    {
        label: "Cart",
        path: "/cart",
        icon: LuShoppingCart
    },
    {
        label: "Profile",
        path: "/profile",
        icon: LuUserRound
    }
];

const CustomerBottomNavigation = () => {
    return (
        <nav className="customer-bottom-navigation" aria-label="Main navigation">
            {navigationItems.map(({ label, path, icon: Icon, end }) => (
                <NavLink
                    key={path}
                    to={path}
                    end={end}
                    className={({ isActive }) =>
                        `customer-bottom-navigation-item ${isActive ? "active" : ""}`
                    }
                >
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default CustomerBottomNavigation;
