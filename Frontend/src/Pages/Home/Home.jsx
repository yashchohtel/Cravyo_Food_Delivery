import { useState } from 'react';
import NavbarBottom from '../../Components/Navbars/Navbar Bottom/NavbarBottom';
import NavbarTop from '../../Components/Navbars/Navbar Top/NavbarTop';
import './Home.css';

const Home = () => {

  // state to show food prefrence dialogbox
  const [vegMode, setVegMode] = useState(false);



  return (
    <>

      {/* home page */}
      <div className="homePage">

        {/* navbar top */}
        <NavbarTop />

        {/* navbar bottom */}
        <NavbarBottom
          vegMode={vegMode}         // current veg filter status
          setVegMode={setVegMode}   // toggle veg filter
        />

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