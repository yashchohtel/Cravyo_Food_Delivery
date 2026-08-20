import { useEffect, useRef, useState } from 'react';
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
import { categories } from '../../utils/dummyData.js';

const Home = () => {

  // initilize useDispatch
  const dispatch = useDispatch();

  /* -------------------------------------- */

  // Get location state from Redux store
  const { isLocationErrorDialogOpen, locationError, isLocationLoading } = useSelector((state) => state.location);

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

  /* FOOD CATEGORY ↓ -------------------------------------------- */

  // state to store see all categories 
  const [showAllCategories, setShowAllCategories] = useState(false);

  // state to store user clicked category item
  const [selectedCategory, setSelectedCategory] = useState("all");

  // state to store the category which is other then the visible item
  const [hiddenCategoryItem, setHiddenCategoryItem] = useState(null);

  // reference of swiper
  const swiperRef = useRef(null);

  // function to get the click category element
  const handleCategoryClick = (categoryId) => {

    // set selected category item id to make item active
    setSelectedCategory(categoryId);

    // get selected item object
    const selectedItem = categories.find(category => category.id === categoryId);

    // find if its visible item or hidden item
    const isVisible = categories.slice(0, 10).some((category) => category.id === categoryId);

    // if hidden item set it in hidden item category
    setHiddenCategoryItem(isVisible ? null : selectedItem);

    // move swiper to selected category
    if (isVisible && swiperRef.current) {

      const index = categories.slice(0, 10).findIndex((category) => category.id === categoryId);

      swiperRef.current.slideTo(index);
    }

  };

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


// funciton to handle logout
// const handleLogout = async () => {
//   await signOut(auth)
//   dispatch(logoutUser());
// };

