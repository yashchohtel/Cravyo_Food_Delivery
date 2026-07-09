import SplashLoader from "../../Components/Loaders/SplashLoader/SplashLoader";
import "./Spladh.css";

const Splash = () => {
    return (
        <div className="splash container">

            <img src="/logosmall.png" alt="Cravyo Logo" className="logo" />

            <SplashLoader />

        </div>
    );
};

export default Splash;