import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authThunk.js";
import { signOut } from "firebase/auth";
import './Home.css'
import { auth } from "../../firebase/firebase.js";
import { Link } from "react-router-dom";

const Home = () => {

  // initialize use dispatch
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  /* -------------------------------------- */

  // funciton to handle logout
  const handleLogout = async () => {
    await signOut(auth)
    dispatch(logoutUser());
  };

  return (
    <>
      <div className="homePage">


        <h1>HOME PAGE</h1> <br /> <br />
        <br /><br />

        <Link to="/home">Home Page</Link>

        <br /><br />

        {user?.roles?.includes("restaurantOwner") && (
          <>
            <Link to="/restaurant">Restaurant Owner Dashboard</Link>
            <br /><br />
          </>
        )}

        {user?.roles?.includes("deliveryBoy") && (
          <>
            <Link to="/delivery">Delivery Boy Dashboard</Link>
            <br /><br />
          </>
        )}

        <button className="btn btnPrimary logout" onClick={() => handleLogout()}>
          Logout
        </button>

      </div>

    </>
  )
}

export default Home