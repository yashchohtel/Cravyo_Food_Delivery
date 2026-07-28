import NavbarBottom from '../../Components/Navbars/Navbar Bottom/NavbarBottom';
import NavbarTop from '../../Components/Navbars/Navbar Top/NavbarTop';
import './Home.css';

const Home = () => {

  return (
    <>

      {/* home page */}
      <div className="homePage">

        {/* navbar top */}
        <NavbarTop />

        {/* navbar bottom */}
        <NavbarBottom />

        <button className='btn btnPrimary'>
          logout
        </button>

        <button className='btn btnPrimary'>
          delete
        </button>

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