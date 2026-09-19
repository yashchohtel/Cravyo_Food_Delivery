import AdminPanelTopNavbar from "../../../Components/Navbars/Admin Panel Top Navbar/AdminPanelTopNavbar"
import './CreateRestaurant.css'
import { Upload, Image as Store, MapPin, Clock, Leaf, Utensils } from "lucide-react";
import CreateRestaurantMap from "../../../Components/Ui/Create Restaurant Map/CreateRestaurantMap";
import useCreateRestaurant from "../../../hooks/Restaruant Owner Hooks/useCreateRestaurant";
import { useSelector } from "react-redux";
import ButtonLoader from "../../../Components/Loaders/ButtonLoader/ButtonLoader";

const CreateRestaurant = () => {

  const { loading } = useSelector((state) => state.restaurant);

  // get state and function form use create restaurant hook
  const {
    formData,
    errors,
    handleMapLocation,
    handleImageChange,
    handleChange,
    handleCreateRestaurant
  } = useCreateRestaurant();

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

          <form onSubmit={handleCreateRestaurant}>

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

                  <label
                    htmlFor="restaurantImage"
                    className={`imageUploadBox ${formData.imagePreview ? "hasImage" : ""}`}
                  >
                    {formData.imagePreview ? (
                      <img src={formData.imagePreview} alt="Restaurant preview" />
                    ) : (
                      <>
                        <Upload size={40} />
                        <strong>Click to upload or drag & drop</strong>
                        <p>PNG, JPG, WEBP (Max. 2MB)</p>
                      </>
                    )}
                  </label>

                  {errors.image && <p className="formError">{errors.image}</p>}

                </div>

                {/* restaurant name */}
                <div className="formGroup">

                  <label>Restaurant Name <span>*</span></label>

                  <div className={`inputBox ${errors.name ? "inputError" : ""}`}>
                    <Store size={19} />
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. The Spice House"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  {errors.name && <p className="formError">{errors.name}</p>}

                </div>

                {/* description */}
                <div className="formGroup">

                  <label>Description <span>*</span></label>

                  <div className={`textareaBox ${errors.description ? "inputError" : ""}`}>
                    <textarea
                      name="description"
                      maxLength="500"
                      placeholder="Tell customers about your restaurant, your specialties, ambience, etc."
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                    <small>{formData.description.length}/500</small>
                  </div>

                  {errors.description && <p className="formError">{errors.description}</p>}

                </div>

                {/* opening closing time */}
                <div className="formRow">

                  <div className="formGroup">

                    <label>Opening Time <span>*</span></label>

                    <div className={`inputBox ${errors.openingTime ? "inputError" : ""}`}>
                      <Clock size={19} />
                      <input
                        type="time"
                        name="openingTime"
                        value={formData.openingTime}
                        onChange={handleChange}
                      />
                    </div>

                    {errors.openingTime && <p className="formError">{errors.openingTime}</p>}

                  </div>

                  <div className="formGroup">

                    <label>Closing Time <span>*</span></label>

                    <div className={`inputBox ${errors.closingTime ? "inputError" : ""}`}>
                      <Clock size={19} />
                      <input
                        type="time"
                        name="closingTime"
                        value={formData.closingTime}
                        onChange={handleChange}
                      />
                    </div>

                    {errors.closingTime && <p className="formError">{errors.closingTime}</p>}

                  </div>

                </div>

                {/* food type */}
                <div className="formGroup formGroupFoodType">

                  <label>Food Type <span>*</span></label>

                  <div className="foodTypeRow">

                    <label className="foodTypeButton veg">
                      <input
                        type="radio"
                        name="foodType"
                        value="pureVeg"
                        checked={formData.foodType === "pureVeg"}
                        onChange={handleChange}
                      />
                      <Leaf size={22} />
                      <span>Pure Veg</span>
                    </label>

                    <label className="foodTypeButton all">
                      <input
                        type="radio"
                        name="foodType"
                        value="all"
                        checked={formData.foodType === "all"}
                        onChange={handleChange}
                      />
                      <Utensils size={21} />
                      <span>All</span>
                    </label>

                  </div>

                  {errors.foodType && <p className="formError">{errors.foodType}</p>}

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

                  <div className={`inputBox ${errors.street ? "inputError" : ""}`}>
                    <MapPin size={19} />
                    <input
                      type="text"
                      name="street"
                      placeholder="e.g. 123, MG Road, Vijay Nagar"
                      value={formData.street}
                      onChange={handleChange}
                    />
                  </div>

                  {errors.street && <p className="formError">{errors.street}</p>}

                </div>

                {/* city state */}
                <div className="formRow">

                  <div className="formGroup">

                    <label>City <span>*</span></label>

                    <div className={`inputBox ${errors.city ? "inputError" : ""}`}>
                      <MapPin size={19} />
                      <input
                        type="text"
                        name="city"
                        placeholder="e.g. Indore"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>

                    {errors.city && <p className="formError">{errors.city}</p>}

                  </div>

                  <div className="formGroup">

                    <label>State <span>*</span></label>

                    <div className={`inputBox ${errors.state ? "inputError" : ""}`}>
                      <MapPin size={19} />
                      <input
                        type="text"
                        name="state"
                        placeholder="e.g. Madhya Pradesh"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>

                    {errors.state && <p className="formError">{errors.state}</p>}

                  </div>

                </div>

                {/* pincode */}
                <div className="formGroup">

                  <label>Pincode <span>*</span></label>

                  <div className={`inputBox ${errors.pincode ? "inputError" : ""}`}>
                    <MapPin size={19} />
                    <input
                      type="text"
                      name="pincode"
                      placeholder="e.g. 452001"
                      value={formData.pincode}
                      onChange={handleChange}
                      maxLength={6}
                      inputMode="numeric"
                    />
                  </div>

                  {errors.pincode && <p className="formError">{errors.pincode}</p>}

                </div>

                {/* selected location */}
                <div className="formGroup">

                  <label>Selected Location <span>*</span></label>

                  <div className={`inputBox ${errors.mapLocation ? "inputError" : ""}`}>
                    <MapPin size={19} />
                    <input
                      type="text"
                      placeholder="Select restaurant location from map"
                      value={formData.mapLocation}
                      readOnly
                    />
                  </div>

                  {errors.mapLocation && <p className="formError">{errors.mapLocation}</p>}

                </div>

                {/* map */}
                <CreateRestaurantMap
                  handleMapLocation={handleMapLocation}
                />

                {(errors.latitude || errors.longitude) && (
                  <p className="formError">Please select a valid restaurant location from the map</p>
                )}

              </div>

            </div>

            {/* form actions */}
            <div className="restaurantFormActions">

              <button
                type="button"
                className="cancelButton"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="createRestaurantButton"
                disabled={loading}
              >
                {loading ? <ButtonLoader /> : "Create Restaurant"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </>

  )

}

export default CreateRestaurant
