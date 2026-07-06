import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes"
import { useEffect, useState } from "react";
import { loadUser } from "./features/auth/authThunk";
import Splash from "./Pages/Splash/Splash";

function App() {

  // initialize use dispatch
  const dispatch = useDispatch();

  /* -------------------------------------- */

  // Get auth state from Redux store
  const { authLoading } = useSelector((state) => state.auth);

  /* -------------------------------------- */

  // State to track if the minimum time has passed
  const [minTimeDone, setMinTimeDone] = useState(false);

  // effect to load user and set a minimum time for the splash screen
  useEffect(() => {

    // dispatch the loadUser thunk to fetch the current authenticated user
    dispatch(loadUser());

    const timer = setTimeout(() => {
      setMinTimeDone(true);
    }, 1000);

    return () => clearTimeout(timer);

  }, [dispatch]);
 
  if (authLoading || !minTimeDone) {
    return <Splash />;
  }

  {/* app routes to manage all routes */ }
  return <AppRoutes />;

}

export default App;


