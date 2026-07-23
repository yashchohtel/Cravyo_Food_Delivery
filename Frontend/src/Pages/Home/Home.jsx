import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authThunk.js";
import { signOut } from "firebase/auth";
import './Home.css'
import { auth } from "../../firebase/firebase.js";

const Home = () => {

  // initialize use dispatch
  const dispatch = useDispatch();

  /* -------------------------------------- */

  // funciton to handle logout
  const handleLogout = async () => {
    await signOut(auth)
    dispatch(logoutUser());
  };

  return (
    <>
      <div className="homePage">

        Home

        <button className="btn btnPrimary logout" onClick={() => handleLogout()}>
          Logout
        </button>

      </div>

    </>
  )
}

export default Home