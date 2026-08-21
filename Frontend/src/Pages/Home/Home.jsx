import { useEffect } from 'react';
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
import HomePromotionSlider from '../../Components/Sliders/Home Promotion Slider/HomePromotionSlider.jsx';
import FoodCategorySlider from '../../Components/Sliders/Food Category Slider/FoodCategorySlider.jsx';
import AllCategoryPage from '../../Components/Ui/AllCategoryPage/AllCategoryPage.jsx';
import useFoodCategories from '../../hooks/useFoodCategories.jsx';
import useFoodPreference from '../../hooks/useFoodPreference.jsx';

const Home = () => {

  // initilize useDispatch
  const dispatch = useDispatch();

  /* -------------------------------------- */

  // Get location state from Redux store
  const { isLocationErrorDialogOpen, locationError, isLocationLoading } = useSelector((state) => state.location);

  /* FOOD PREFRENCE ↓ -------------------------------------- */

  // get element of useFoodPrefrence hook
  const {
    isFoodDialogOpen,       // food preference dialog state
    setIsFoodDialogOpen,    // update dialog state
    userFoodPreference,     // current food preference
    setUserFoodPreference   // update food preference
  } = useFoodPreference();

  /* FOOD CATEGORY ↓ -------------------------------------------- */

  // get elements of use food categoires hook
  const {
    showAllCategories,      // show/hide all categories
    setShowAllCategories,   // update show/hide all categories state
    selectedCategory,       // selected category id
    hiddenCategoryItem,     // selected hidden category
    swiperRef,              // Swiper reference
    handleCategoryClick     // handle category selection
  } = useFoodCategories();

  /* EFFECTS ↓ -------------------------------------------- */

  // effect to clear the temperory search data and query on location page leave
  useEffect(() => {

    // Clear temporary location search data
    sessionStorage.removeItem("locationSearchQuery");
    sessionStorage.removeItem("locationSearchResults");

  }, []);

  // useEffect to get user's location on component mount
  useEffect(() => {

    // Call the handleGetLocation function to get user's location and handle errors - dispatch to dispatch location actions
    handleGetLocation(dispatch);

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
        <NavbarTop />

        {/* navbar bottom */}
        <NavbarBottom
          setIsFoodDialogOpen={setIsFoodDialogOpen} // to set food prefrence dialog box open/close state
          userFoodPreference={userFoodPreference} // user's current Food Preference
          setUserFoodPreference={setUserFoodPreference} // to set user food prefrence all / veg only
        />

        {/* home promotional slides */}
        <HomePromotionSlider />

        {/* food category slider */}
        <FoodCategorySlider
          onClick={() => setShowAllCategories(true)}
          handleCategoryClick={handleCategoryClick}
          selectedCategory={selectedCategory}
          hiddenCategoryItem={hiddenCategoryItem}
          swiperRef={swiperRef}
        />

        {/* all food category */}
        {showAllCategories && (
          <AllCategoryPage
            onClose={() => setShowAllCategories(false)}
            handleCategoryClick={handleCategoryClick}
            selectedCategory={selectedCategory}
          />
        )}

      </div>

    </>
  )

}

export default Home;


