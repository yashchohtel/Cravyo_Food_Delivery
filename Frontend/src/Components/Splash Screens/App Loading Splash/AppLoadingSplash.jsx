import SplashLoader from "../../Loaders/SplashLoader/SplashLoader";
import './AppLoadingSplash.css'

const AppLoadingSplash = () => {
    return (
        <>
            <div className="splash container">

                <img src="/logosmall.png" alt="Cravyo Logo" className="logo" />

                <SplashLoader />

            </div>
        </>
    )
}
export default AppLoadingSplash