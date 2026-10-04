import './NavbarTop.css';
import { useSelector } from 'react-redux';
import { FaLocationDot } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { FiShoppingBag, FiUser, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NavbarTop = () => {

  const { user } = useSelector((state) => state.auth);

  const {
    userCurrentLocation,
    selectedLocation
  } = useSelector((state) => state.location);

  const {
    restaurant,
    items,
    totalItems,
    totalPrice
  } = useSelector((state) => state.cart);

  const displayLocation =
    selectedLocation?.address
      ? selectedLocation
      : userCurrentLocation;

  const navigate = useNavigate();

  const [isProfileImageError, setIsProfileImageError] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {

    if (!isCartOpen) return;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };

  }, [isCartOpen]);

  const handleCartClick = () => {

    if (totalItems === 0) {
      navigate('/cart');
      return;
    }

    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <header className="top-navbar container">

        {/* Location */}

        <button
          className="navbar-left location"
          onClick={() => navigate('/location')}
        >

          <div className="locationTop">

            <span className="location-icon">
              <FaLocationDot />
            </span>

            <p className="destination">
              Deliver to
              <IoIosArrowForward />
            </p>

          </div>

          <p className="address">
            {displayLocation?.address ||
              'Getting your location...'}
          </p>

        </button>


        {/* Right */}

        <div className="navbar-right">

          {/* Cart */}

          <button
            className="icon-btn cart-btn"
            type="button"
            onClick={handleCartClick}
          >

            <FiShoppingBag />

            {totalItems > 0 && (
              <span className="cart-badge">
                {totalItems > 99
                  ? '99+'
                  : totalItems}
              </span>
            )}

          </button>


          {/* Profile */}

          <button
            className="icon-btn"
            type="button"
          >

            {user?.profileImage &&
              !isProfileImageError ? (

              <img
                src={user.profileImage}
                alt={user.fullName}
                className="profile-image"
                onError={() =>
                  setIsProfileImageError(true)
                }
              />

            ) : (

              <FiUser />

            )}

          </button>

        </div>

      </header>


      {/* =================================
                CART OVERLAY
            ================================= */}

      {isCartOpen && (

        <div
          className="cart-overlay"
          onClick={closeCart}
        >

          <div
            className="cart-drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Drawer Header */}

            <div className="cart-drawer__header">

              <div>

                <h2>
                  Your Cart
                </h2>

                <span>
                  {totalItems}{' '}
                  {totalItems === 1
                    ? 'item'
                    : 'items'}
                </span>

              </div>

              <button
                type="button"
                className="cart-drawer__close"
                onClick={closeCart}
              >
                <FiX />
              </button>

            </div>


            {/* Restaurant */}

            <div className="cart-drawer__restaurant">

              <img
                src={restaurant?.image}
                alt={restaurant?.name}
              />

              <div>

                <h3>
                  {restaurant?.name}
                </h3>

                <span>
                  {restaurant?.deliveryTime}
                </span>

              </div>

            </div>


            {/* Items */}

            <div className="cart-drawer__items">

              {items.map((item) => (

                <div
                  className="cart-drawer__item"
                  key={item.foodId}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-drawer__item-info">

                    <h4>
                      {item.name}
                    </h4>

                    <span>
                      ₹{item.price} × {item.quantity}
                    </span>

                  </div>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                </div>

              ))}

            </div>


            {/* Bottom */}

            <div className="cart-drawer__bottom">

              <div className="cart-drawer__total">

                <span>
                  Total
                </span>

                <strong>
                  ₹{totalPrice}
                </strong>

              </div>

              <button
                type="button"
                className="cart-drawer__view-button"
                onClick={() => {
                  closeCart();
                  navigate('/cart');
                }}
              >
                View Cart
                <IoIosArrowForward />
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
};

export default NavbarTop;