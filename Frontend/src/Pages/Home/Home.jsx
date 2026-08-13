import { useEffect, useState } from 'react';
import NavbarBottom from '../../Components/Navbars/Navbar Bottom/NavbarBottom';
import NavbarTop from '../../Components/Navbars/Navbar Top/NavbarTop';
import './Home.css';
import Modal from '../../Components/Modal/Modal';
import FoodPreferenceDialog from '../../Components/Dialogs/Food Preference Dialog/FoodPreferenceDialog';
import { handleGetLocation } from '../../utils/getLocation';
import LocationErrorDialog from '../../Components/Dialogs/Location Error Dialog/LocationErrorDialog';
import LocationLoadingSplash from '../../Components/Splash Screens/Location Loading Splash/LocationLoadingSplash';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLocationErrorDialogOpen } from '../../features/Location/locationSlice.js';

const Home = () => {

  // initilize useDispatch
  const dispatch = useDispatch();

  /* -------------------------------------- */

  // Get location state from Redux store
  const { isLocationErrorDialogOpen, locationError, userLocation, isLocationLoading } = useSelector((state) => state.location);
  
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

  /* EFFECTS ↓ -------------------------------------------- */

  // useEffect to get user's location on component mount
  useEffect(() => {

    // Call the handleGetLocation function to get user's location and handle errors
    handleGetLocation(
      dispatch, // dispatch to dispatch location actions
    );

  }, [dispatch]);

  // If the location is still loading, show the LocationLoadingSplash component
  if (isLocationLoading) {
    return <LocationLoadingSplash />;
  }

  return (

    <>

      {/* home page */}
      <div className="homePage">

        {/* location error modal */}
        <Modal
          isOpen={isLocationErrorDialogOpen} // location error dialog box open/close state 
          onClose={() => dispatch(setIsLocationErrorDialogOpen(false))} // function to close current opened dialog box
        >

          {/* location error dialog box */}
          <LocationErrorDialog
            error={locationError} // to display the location error message
            onClose={() => dispatch(setIsLocationErrorDialogOpen(false))} // function to close current opened dialog box
            onRetry={() => handleGetLocation(dispatch)} // to retry getting user location
          />

        </Modal>

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

      </div>

    </>
  )

}

export default Home;


// funciton to handle logout
// const handleLogout = async () => {
//   await signOut(auth)
//   dispatch(logoutUser());
// };