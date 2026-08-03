import { useState } from 'react';
import NavbarBottom from '../../Components/Navbars/Navbar Bottom/NavbarBottom';
import NavbarTop from '../../Components/Navbars/Navbar Top/NavbarTop';
import './Home.css';
import Modal from '../../Components/Modal/Modal';
import FoodPreferenceDialog from '../../Components/Dialogs/Food Preference Dialog/FoodPreferenceDialog';
import { handleGetLocation } from '../../utils/getLocation';
import LocationErrorDialog from '../../Components/Dialogs/Location Error Dialog/LocationErrorDialog';

const Home = () => {

  /* LOCATION ↓ -------------------------------------- */

  // state to manage location dialog open/close state
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);

  // state to store location error message
  const [locationError, setLocationError] = useState(null); // "permission" / "positionUnavailable" / "timeout" / "unknown"

  // state to store user's location (latitude, longitude, address)
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
    address: ""
  });

  console.log(userLocation);
  
  /* FOOD PREFRENCE ↓ -------------------------------------- */

  // state to show/hide food prefrence dialog box
  const [isFoodDialogOpen, setIsFoodDialogOpen] = useState(false);

  // State to store user's food preference ("all" / "veg")
  const [userFoodPreference, setUserFoodPreference] = useState(() => {

    // Get the saved food preference from localStorage
    const savedPreference = localStorage.getItem("userFoodPreference");

    // If no preference is saved, show all restaurants by default
    if (savedPreference === null) {
      return "all";
    }

    // Return the saved preference ("all" or "veg")
    return JSON.parse(savedPreference);

  });

  /* -------------------------------------- */

  return (

    <>

      {/* home page */}
      <div className="homePage">

        {/* location error modal */}
        <Modal
          isOpen={isLocationDialogOpen} // location error dialog box open/close state 
          onClose={() => setIsLocationDialogOpen(false)} // function to close current opened dialog box
        >

          {/* location error dialog box */}
          <LocationErrorDialog
            error={locationError} // to display the location error message
            onClose={() => setIsLocationDialogOpen(false)} // function to close current opened dialog box
            onRetry={() => handleGetLocation(setLocationError, setIsLocationDialogOpen, setUserLocation)} // to retry getting user location
          />

        </Modal>

        {/* navbar top */}
        <NavbarTop
          userLocation={userLocation} // user's current location (latitude, longitude, address)
        />

        {/* navbar bottom */}
        <NavbarBottom
          setIsFoodDialogOpen={setIsFoodDialogOpen} // to set food prefrence dialog box open/close state
          userFoodPreference={userFoodPreference} // user's current Food Preference
          setUserFoodPreference={setUserFoodPreference} // to set user food prefrence all / veg only
        />

        {/* food prefrence modal */}
        <Modal
          isOpen={isFoodDialogOpen} // food prefrence dialog box open/close state 
          onClose={() => setIsFoodDialogOpen(false)} // function to close current opened dialog box
        >

          {/* food preference dialog box */}
          <FoodPreferenceDialog
            onClose={() => setIsFoodDialogOpen(false)} // function to close current opened dialog box
            setUserFoodPreference={setUserFoodPreference} // to set user food prefrence all / veg only
          />

        </Modal>

      </div>

      <button
        className="btn btnPrimary"
        onClick={() => handleGetLocation(
          setLocationError,
          setIsLocationDialogOpen,
          setUserLocation,
        )}
      >
        Get Location
      </button>

    </>
  )
}

export default Home;














// funciton to handle logout
// const handleLogout = async () => {
//   await signOut(auth)
//   dispatch(logoutUser());
// };