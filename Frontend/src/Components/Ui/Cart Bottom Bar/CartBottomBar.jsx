import { useSelector } from "react-redux";
import { IoChevronForward } from "react-icons/io5";
import "./CartBottomBar.css";


const CartBottomBar = ({ onViewCart }) => {

    // getting cart data
    const { items, totalItems } = useSelector((state) => state.cart);

    // don't show cart bar when cart is empty
    if (!items?.length || totalItems === 0) return null;

    // show maximum 3 food images
    const cartImages = items.slice(0, 3);

    return (
        
        <div className="cartBottomBarWrapper">

            <div className="cartBottomBar">

                {/* cart food images */}
                <div className="cartBottomBarImages">

                    {cartImages.map((item, index) => (

                        <div
                            className="cartBottomBarImage"
                            key={item.foodId}
                            style={{
                                zIndex: cartImages.length - index,
                                marginLeft: index === 0 ? 0 : "-1.4rem"
                            }}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                            />
                        </div>

                    ))}


                    {/* total item badge */}
                    <span className="cartBottomBarBadge">
                        {totalItems}
                    </span>

                </div>


                {/* cart information */}
                <div className="cartBottomBarInfo">

                    <span className="cartBottomBarCount">
                        {totalItems} {totalItems === 1 ? "item" : "items"} added
                    </span>

                    <span className="cartBottomBarSubText">
                        in your cart
                    </span>

                </div>


                {/* view cart */}
                <button
                    className="cartBottomBarButton"
                    onClick={onViewCart}
                >
                    <span>
                        View Cart
                    </span>

                    <IoChevronForward />
                </button>

            </div>

        </div>
    );
};

export default CartBottomBar;