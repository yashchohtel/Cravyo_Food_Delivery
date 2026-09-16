import AdminPanelTopNavbar from "../../../Components/Navbars/Admin Panel Top Navbar/AdminPanelTopNavbar"
import './CreateRestaurant.css'
import { useState } from "react";
import { Upload, Image as Store, MapPin, Clock, Leaf, Utensils } from "lucide-react";
import CreateRestaurantMap from "../../../Components/Ui/Create Restaurant Map/CreateRestaurantMap";
import useCreateRestaurant from "../../../hooks/useCreateRestaurant";

const CreateRestaurant = () => {

  // get state and function form use create restaurant hook
  const {
    formData,
    handleMapLocation
  } = useCreateRestaurant();

  /* -------------------------------------- */

  const [imagePreview, setImagePreview] = useState(null);

  // handle restaurant image
  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

  };

  return (

    <>

      {/* create restuarant form */}
      <div className="createRestuarant">

        {/* navbar top */}
        <AdminPanelTopNavbar />

        {/* restaurant banner */}
        <div className="container">
          <div className="restaurantHero">
            <div className="restaurantHeroContent">
              <span>LET'S BRING GREAT FOOD ONLINE</span>
              <h1>List Your Restaurant on <strong>Cravyo</strong></h1>
            </div>
          </div>
        </div>

        {/* create restaurant form */}
        <div className="container">

          <div className="restaurantForm">

            {/* basic information */}
            <div className="restaurantFormCard">

              <div className="formCardHeader">
                <div className="formCardIcon">
                  <Store size={2} />
                </div>

                <div>
                  <h2>Basic Information</h2>
                  <p>Tell us about your restaurant</p>
                </div>
              </div>

              {/* restaurant image */}
              <div className="formGroup">

                <label>Restaurant Image / Logo <span>*</span></label>

                <input
                  type="file"
                  id="restaurantImage"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageChange}
                  hidden
                />

                <label htmlFor="restaurantImage" className={`imageUploadBox ${imagePreview ? "hasImage" : ""}`}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Restaurant preview" />
                  ) : (
                    <>
                      <Upload size={40} />
                      <strong>Click to upload or drag & drop</strong>
                      <p>PNG, JPG, WEBP (Max. 2MB)</p>
                    </>
                  )}
                </label>

              </div>

              {/* restaurant name */}
              <div className="formGroup">

                <label>Restaurant Name <span>*</span></label>

                <div className="inputBox">
                  <Store size={19} />
                  <input type="text" placeholder="e.g. The Spice House" />
                </div>

              </div>

              {/* description */}
              <div className="formGroup">

                <label>Description <span>*</span></label>

                <div className="textareaBox">
                  <textarea
                    maxLength="500"
                    placeholder="Tell customers about your restaurant, your specialties, ambience, etc."
                  ></textarea>
                  <small>0/500</small>
                </div>

              </div>

              {/* opening closing time */}
              <div className="formRow">

                <div className="formGroup">

                  <label>Opening Time <span>*</span></label>

                  <div className="inputBox">
                    <Clock size={19} />
                    <input type="time" />
                  </div>

                </div>

                <div className="formGroup">

                  <label>Closing Time <span>*</span></label>

                  <div className="inputBox">
                    <Clock size={19} />
                    <input type="time" />
                  </div>

                </div>

              </div>

              {/* food type */}
              <div className="formGroup formGroupFoodType">

                <label>Food Type <span>*</span></label>

                <div className="foodTypeRow">

                  <label className="foodTypeButton veg">
                    <input type="radio" name="foodType" value="pureVeg" />
                    <Leaf size={22} />
                    <span>Pure Veg</span>
                  </label>

                  <label className="foodTypeButton all">
                    <input type="radio" name="foodType" value="all" />
                    <Utensils size={21} />
                    <span>All</span>
                  </label>

                </div>

              </div>

            </div>

            {/* location details */}
            <div className="restaurantFormCard">

              <div className="formCardHeader">
                <div className="formCardIcon locationIcon">
                  <MapPin size={20} />
                </div>

                <div>
                  <h2>Location Details</h2>
                  <p>Set your restaurant's address and location</p>
                </div>
              </div>

              {/* street / area */}
              <div className="formGroup">

                <label>Street / Area <span>*</span></label>

                <div className="inputBox">
                  <MapPin size={19} />
                  <input type="text" placeholder="e.g. 123, MG Road, Vijay Nagar" />
                </div>

              </div>

              {/* city state */}

              <div className="formRow">

                <div className="formGroup">

                  <label>City <span>*</span></label>

                  <div className="inputBox">
                    <MapPin size={19} />
                    <input type="text" placeholder="e.g. Indore" />
                  </div>

                </div>

                <div className="formGroup">

                  <label>State <span>*</span></label>

                  <div className="inputBox">
                    <MapPin size={19} />
                    <input type="text" placeholder="e.g. Madhya Pradesh" />
                  </div>

                </div>

              </div>

              {/* pincode */}
              <div className="formGroup">

                <label>Pincode <span>*</span></label>

                <div className="inputBox">
                  <MapPin size={19} />
                  <input type="text" placeholder="e.g. 452001" />
                </div>

              </div>

              {/* selected location */}
              <div className="formGroup">

                <label>Selected Location <span>*</span></label>

                <div className="inputBox">
                  <MapPin size={19} />
                  <input
                    type="text"
                    placeholder="Select restaurant location from map"
                    value={formData.mapLocation}
                    readOnly
                  />
                </div>

              </div>

              {/* map */}
              <CreateRestaurantMap
                handleMapLocation={handleMapLocation}
              />

            </div>

          </div>

          {/* form actions */}
          <div className="restaurantFormActions">

            <button type="button" className="cancelButton">
              Cancel
            </button>

            <button type="button" className="createRestaurantButton">
              Create Restaurant
            </button>

          </div>

        </div>

      </div>

    </>

  )

}

export default CreateRestaurant