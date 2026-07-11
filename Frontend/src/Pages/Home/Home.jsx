import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authThunk.js";
import './Home.css'

const Home = () => {

  // initialize use dispatch
  const dispatch = useDispatch();

  /* -------------------------------------- */

  return (
    <>
      <div className="homePage">

        Home

        <button className="btn btnPrimary logout" onClick={() => {
          console.log("clicked");
          dispatch(logoutUser());
        }}>
          Logout
        </button>

      </div>

    </>
  )
}
export default Home