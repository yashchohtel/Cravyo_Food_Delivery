import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./spladh.css";
import { loadUser } from "../../features/auth/authThunk";


const Splash = () => {

    // initialize use dispatch
    const dispatch = useDispatch();

    /* -------------------------------------- */

    // initialize use navigate
    const navigate = useNavigate();

    /* -------------------------------------- */

    // Get auth state from Redux store
    const { authLoading, isAuthenticated } = useSelector((state) => state.auth);

    /* -------------------------------------- */

    // Run only once when Splash loads
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    // Redirect after authentication check
    useEffect(() => {

        if (!authLoading) {

            if (isAuthenticated) {
                navigate("/home", { replace: true });
            } else {
                navigate("/auth", { replace: true });
            }

        }

    }, [authLoading, isAuthenticated, navigate]);

    /* -------------------------------------- */

    return (
        <div className="splash-container">
            <h1 className="logo">CRAVYO</h1>
            <div className="loader"></div>
        </div>
    );
};

export default Splash;