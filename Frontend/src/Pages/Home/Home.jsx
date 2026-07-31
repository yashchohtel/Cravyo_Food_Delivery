import { useState } from 'react';
import NavbarBottom from '../../Components/Navbars/Navbar Bottom/NavbarBottom';
import NavbarTop from '../../Components/Navbars/Navbar Top/NavbarTop';
import './Home.css';
import Modal from '../../Components/Modal/Modal';
import FoodPreferenceDialog from '../../Components/Dialogs/Food Preference Dialog/FoodPreferenceDialog';

const Home = () => {

  // state to show/hide food prefrence dialog box
  const [isFoodDialogOpen, setIsFoodDialogOpen] = useState(false);

  /* -------------------------------------- */

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

        {/* navbar top */}
        <NavbarTop />

        {/* navbar bottom */}
        <NavbarBottom
          setIsFoodDialogOpen={setIsFoodDialogOpen} // to set food prefrence dialog box open/close state
          userFoodPreference={userFoodPreference} // user's current Food Preference
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

    </>
  )
}

export default Home



















// funciton to handle logout
// const handleLogout = async () => {
//   await signOut(auth)
//   dispatch(logoutUser());
// };