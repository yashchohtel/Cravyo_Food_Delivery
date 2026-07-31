import { useState } from 'react';
import NavbarBottom from '../../Components/Navbars/Navbar Bottom/NavbarBottom';
import NavbarTop from '../../Components/Navbars/Navbar Top/NavbarTop';
import './Home.css';
import Modal from '../../Components/Modal/Modal';
import FoodPreferenceDialog from '../../Components/Dialogs/Food Preference Dialog/FoodPreferenceDialog';

const Home = () => {

  // state to show food prefrence dialogbox
  const [vegMode, setVegMode] = useState(false);

  // state to show/hide food prefrence dialog box
  const [isFoodDialogOpen, setIsFoodDialogOpen] = useState(false);

  return (

    <>

      {/* home page */}
      <div className="homePage">

        {/* navbar top */}
        <NavbarTop />

        {/* navbar bottom */}
        <NavbarBottom
          vegMode={vegMode} // current veg filter status
          setIsFoodDialogOpen={setIsFoodDialogOpen} // to set food prefrence dialog open close state
        />

        {/* food prefrence modal */}
        <Modal
          isOpen={isFoodDialogOpen} // food prefrence dialog open close state
          onClose={() => setIsFoodDialogOpen(false)}
        >

          {/* food preference dialog box */}
          <FoodPreferenceDialog
            setIsFoodDialogOpen={setIsFoodDialogOpen} // to set food prefrence dialog open close state
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