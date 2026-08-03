import './LocationErrorDialog.css'
import { IoClose } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsGearFill } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { IoAlert } from "react-icons/io5";

const LocationErrorDialog = (props) => {

    // destructure props
    const {
        error, // to display the location error message
        onClose, // to set location error dialog open close state
        onRetry, // to retry getting user location
    } = props;

    return (

        <>
            {/* locatino error dialog */}
            <div className="locErr-dialog">

                {/* Close Button */}
                <button
                    className="locErr-closeBtn"
                    onClick={onClose}
                >
                    <IoClose />
                </button>

                {/* Permission Denied */}
                {error === "permission" && (
                    <>
                        <div className="locErr-icon permission">
                            <FaLocationDot className="location-icon" />
                            <IoIosCloseCircleOutline className="status-icon" />
                        </div>

                        <h2>Location Permission Needed</h2>

                        <p>
                            To show nearby restaurants,
                            <br />
                            please allow location access.
                        </p>
                    </>
                )}

                {/* Location Service Off */}
                {error === "positionUnavailable" && (
                    <>
                        <div className="locErr-icon service">
                            <FaLocationDot className="location-icon" />
                            <BsGearFill className="status-icon" />
                        </div>

                        <h2>Turn On Location</h2>

                        <p>
                            We couldn't get your location.
                            <br />
                            Please turn on your device location and try again.
                        </p>
                    </>
                )}

                {/* Timeout */}
                {error === "timeout" && (
                    <>
                        <div className="locErr-icon timeout">
                            <FaLocationDot className="location-icon" />
                            <IoMdTime className="status-icon" />
                        </div>

                        <h2>Still Trying...</h2>

                        <p>
                            It took too long to get your location.
                            <br />
                            Please check your internet and try again.
                        </p>
                    </>
                )}

                {/* Unknown Error */}
                {error === "unknown" && (
                    <>
                        <div className="locErr-icon unknown">
                            <FaLocationDot className="location-icon" />
                            <IoAlert className="status-icon" />
                        </div>

                        <h2>Couldn't Get Location</h2>

                        <p>
                            Something went wrong while getting your location.
                            <br />
                            Please try again.
                        </p>
                    </>
                )}

                {/* Retry Button */}
                <button
                    className="btn btnPrimary"
                    onClick={onRetry}
                >
                    Retry
                </button>

            </div>
        </>

    )

}

export default LocationErrorDialog