import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes"
import { useEffect, useState } from "react";
import { loadUser } from "./features/auth/authThunk";
import AppLoadingSplash from "./Components/Splash Screens/App Loading Splash/AppLoadingSplash";

function App() {

  // initialize use dispatch
  const dispatch = useDispatch();

  // get current route location, used to decide toaster position
  const location = useLocation();

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

  // check if current route belongs to admin section
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (authLoading || !minTimeDone) {
    return <AppLoadingSplash />;
  }

  return (
    <>

      {/* app routes to manage all routes */}
      <AppRoutes />

      {/* toast notifications - position changes based on route */}
      <Toaster
        position={isAdminRoute ? "top-center" : "top-right"}
        toastOptions={{
          style: {
            color: "var(--text-primary)",
            background: "var(--background-color)",
            fontSize: "1.3rem",
            fontWeight: 500,
            letterSpacing: "0.03rem",
          },
          success: {
            iconTheme: {
              primary: "var(--primary-color)",
              secondary: "var(--background-color)",
            },
          },
        }}
      />

    </>
  );

}

export default App;