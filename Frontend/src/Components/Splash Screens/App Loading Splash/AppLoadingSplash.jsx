import SplashLoader from "../../Loaders/SplashLoader/SplashLoader";
import "./AppLoadingSplash.css";

const Splash = () => {
    return (
        <div className="splash container">

            <img src="/logosmall.png" alt="Cravyo Logo" className="logo" />

            <SplashLoader />

        </div>
    );
};

export default Splash;