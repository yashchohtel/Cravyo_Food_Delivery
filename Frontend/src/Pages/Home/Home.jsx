import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authThunk.js";
import './Home.css'

const Home = () => {

  // initialize use dispatch
  const dispatch = useDispatch();

  /* -------------------------------------- */

  return (
    <>
      Home

      <button className="btn btnPrimary logout" onClick={() => {
        console.log("clicked");
        dispatch(logoutUser());
      }}>
        Logout
      </button>


    </>
  )
}
export default Home