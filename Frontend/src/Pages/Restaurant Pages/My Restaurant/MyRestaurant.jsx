import { useSelector } from "react-redux";
import { Store, MapPin, Clock, Leaf, Utensils, Edit, Power, Map, Sun, Moon } from "lucide-react";
import "./MyRestaurant.css";
import RestaurantOwnerFormModal from "../Restaurant Owner Form Modal/RestaurantOwnerFormModal";
import { useState } from "react";

const MyRestaurant = () => {

  // get restaurant from redux
  const { restaurant } = useSelector((state) => state.restaurant);

  console.log(restaurant);

  /* -------------------------------------- */

  // destructure restaurant object
  const { name, image, description, foodType, openingTime, closingTime, isOpen, address } = restaurant;

  // formet time
  const formatTime = (time) => {

    if (!time) return "--";

    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(hours, minutes);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });

  };

  /* -------------------------------------- */

  // modal state
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    mode: null,
    data: null,
  });

  // open modal
  const openModal = (type, mode, data = null) => {
    setModal({
      isOpen: true,
      type,
      mode,
      data,
    });
  };

  // close modal
  const closeModal = () => {
    setModal({
      isOpen: false,
      type: null,
      mode: null,
      data: null,
    });
  };

  /* -------------------------------------- */

  // if no resturant
  if (!restaurant) {
    return (
      <div className="myRestaurantEmpty">
        <Store size={40} />
        <h2>Restaurant not found</h2>
        <p>Restaurant information is not available.</p>
      </div>
    );
  }

  return (

    <div className="myRestaurant">

      {/* add banner component */}
      <RestaurantOwnerFormModal
        isOpen={modal.isOpen}
        type={modal.type}
        mode={modal.mode}
        data={modal.data}
        onClose={closeModal}
      />

      {/* restaurant overview */}
      <div className="restaurantOverview">

        {/* restaurant image */}
        <div className="restaurantOverviewImage">
          <img
            src={image}
            alt={name}
          />
        </div>

        {/* restaurant overview content */}
        <div className="restaurantOverviewContent">

          <div className="restaurantOverviewTop">

            <div className={`restaurantStatus ${isOpen ? "open" : "closed"}`}>
              <span></span>
              {isOpen ? "Currently Open" : "Currently Closed"}
            </div>


            {/* actions */}
            <div className="restaurantActions">

              <button
                className={isOpen ? "closeRestaurantButton" : "openRestaurantButton"}
                type="button"
              >
                <Power size={18} />

                {isOpen
                  ? "Close Restaurant"
                  : "Open Restaurant"
                }
              </button>

              <button
                className="editRestaurantButton"
                type="button"
                onClick={() => openModal("restaurant", "edit", restaurant)}
              >
                <Edit size={18} />
                Edit Restaurant
              </button>

            </div>

          </div>


          <h2>{name}</h2>

          <p className="restaurantDescription">
            {description}
          </p>


          {/* overview details */}
          <div className="restaurantOverviewDetails">

            {/* food type */}
            <div className="overviewDetail">

              <div className="overviewDetailIcon">
                {foodType === "pureVeg"
                  ? <Leaf size={24} />
                  : <Utensils size={24} />
                }
              </div>

              <div>
                <span>Food Type</span>

                <strong>
                  {foodType === "pureVeg"
                    ? "Pure Veg"
                    : "All"
                  }
                </strong>
              </div>

            </div>


            {/* timing */}
            <div className="overviewDetail">

              <div className="overviewDetailIcon">
                <Clock size={24} />
              </div>

              <div>
                <span>Timing</span>

                <strong>
                  {formatTime(openingTime)} - {formatTime(closingTime)}
                </strong>
              </div>

            </div>


            {/* location */}
            <div className="overviewDetail">

              <div className="overviewDetailIcon">
                <MapPin size={24} />
              </div>

              <div>
                <span>Location</span>

                <strong>
                  {address?.city}, {address?.state}
                </strong>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* information grid */}
      <div className="restaurantInfoGrid">


        {/* basic information */}
        <div className="restaurantInfoCard">

          <div className="infoCardHeader">

            <div className="infoCardTitle">

              <div className="infoCardIcon">
                <Store size={21} />
              </div>

              <div>
                <h3>Basic Information</h3>
                <p>Your restaurant's main details</p>
              </div>

            </div>

          </div>


          <div className="infoRows">

            <div className="infoRow">
              <span>Restaurant Name</span>
              <strong>{name}</strong>
            </div>

            <div className="infoRow descriptionRow">
              <span>Description</span>
              <strong>{description}</strong>
            </div>

            <div className="infoRow">
              <span>Food Type</span>

              <strong className="foodTypeValue">

                {foodType === "pureVeg"
                  ? <Leaf size={19} />
                  : <Utensils size={19} />
                }

                {foodType === "pureVeg"
                  ? "Pure Veg"
                  : "All"
                }

              </strong>

            </div>

          </div>

        </div>


        {/* location details */}
        <div className="restaurantInfoCard">

          <div className="infoCardHeader">

            <div className="infoCardTitle">

              <div className="infoCardIcon">
                <MapPin size={21} />
              </div>

              <div>
                <h3>Location Details</h3>
                <p>Your restaurant's address and map location</p>
              </div>

            </div>

          </div>


          <div className="locationContent">

            <div className="locationDetails">

              <div className="infoRow">
                <span>Street / Area</span>
                <strong>{address?.street}</strong>
              </div>

              <div className="infoRow">
                <span>City</span>
                <strong>{address?.city}</strong>
              </div>

              <div className="infoRow">
                <span>State</span>
                <strong>{address?.state}</strong>
              </div>

              <div className="infoRow">
                <span>Pincode</span>
                <strong>{address?.pincode}</strong>
              </div>

              <div className="infoRow">
                <span>Selected Location</span>
                <strong>{address?.mapLocation}</strong>
              </div>

              <div className="infoRow">
                <span>Latitude</span>
                <strong>{address?.latitude}</strong>
              </div>

              <div className="infoRow">
                <span>Longitude</span>
                <strong>{address?.longitude}</strong>
              </div>

            </div>

            {/* map preview */}
            <div className="restaurantMapPreview">

              <div className="mapPreviewContent">

                <MapPin size={38} />

                <strong>{address?.city}</strong>

                <span>
                  {address?.latitude}, {address?.longitude}
                </span>

              </div>

              <button type="button">
                <Map size={16} />
                View on Map
              </button>

            </div>

          </div>

        </div>

      </div>


      {/* business hours */}
      <div className="businessHoursCard">

        <div className="businessHoursHeader">

          <div className="infoCardTitle">

            <div className="infoCardIcon">
              <Clock size={21} />
            </div>

            <div>
              <h3>Business Hours</h3>
              <p>Your restaurant's operating hours</p>
            </div>

          </div>

        </div>


        <div className="businessHoursContent">

          <div className="timeCard opening">

            <div className="timeCardIcon">
              <Sun size={30} />
            </div>

            <div>
              <span>Opening Time</span>
              <strong>{formatTime(openingTime)}</strong>
            </div>

          </div>


          <div className="timeCard closing">

            <div className="timeCardIcon">
              <Moon size={30} />
            </div>

            <div>
              <span>Closing Time</span>
              <strong>{formatTime(closingTime)}</strong>
            </div>

          </div>


          {/* decorative image */}
          <div className="businessHoursImage"></div>

        </div>

      </div>

    </div>
  );
};

export default MyRestaurant;