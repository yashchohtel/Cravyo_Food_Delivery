import SplashLoader from '../../Loaders/SplashLoader/SplashLoader';
import './LocationLoadingSplash.css'

const LocationLoadingSplash = () => {

    return (
        <>
            <div className="location-splash container">

                {/* Illustration */}
                <img
                    src="/location2.png"
                    alt="Finding Location"
                    className="location-image"
                />

                {/* Heading */}
                <h2>Finding your location</h2>

                {/* Description */}
                <p>
                    We're finding nearby restaurants for you.
                    This will only take a moment.
                </p>

                {/* Loader */}
                <SplashLoader />

            </div>
        </>
    )

}

export default LocationLoadingSplash;