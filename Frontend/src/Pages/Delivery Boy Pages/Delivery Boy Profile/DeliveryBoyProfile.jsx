import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    LuArrowRight,
    LuCircleUserRound,
    LuMail,
    LuPhone,
    LuShieldCheck
} from "react-icons/lu";
import useDeliveryBoy from "../../../hooks/Delivery Boy Hooks/useDeliveryBoyHook";
import "./DeliveryBoyProfile.css";

const DeliveryBoyProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const {
        isDeliveryBoyActive,
        deliveryBoyStatusLoading,
        handleStatusChange
    } = useDeliveryBoy();
    const [imageFailed, setImageFailed] = useState(false);

    const fullName = user?.fullName || "Delivery Partner";
    const firstLetter = fullName.charAt(0).toUpperCase();

    return (
        <section className="delivery-profile-page">
            <header className="delivery-profile-page-heading">
                <p>DELIVERY PARTNER</p>
                <h1>My Profile</h1>
            </header>

            <article className="delivery-profile-card">
                <div className="delivery-profile-avatar">
                    {user?.profileImage && !imageFailed ? (
                        <img
                            src={user.profileImage}
                            alt={fullName}
                            onError={() => setImageFailed(true)}
                        />
                    ) : (
                        <span>{firstLetter}</span>
                    )}
                </div>

                <div className="delivery-profile-card-copy">
                    <h2>{fullName}</h2>
                    <p>Delivery Partner</p>
                </div>

                <span className="delivery-profile-verified">
                    <LuShieldCheck aria-hidden="true" /> Verified
                </span>
            </article>

            <article
                className={`delivery-profile-status-card ${isDeliveryBoyActive ? "online" : "offline"}`}
            >
                <div className="delivery-profile-status-copy">
                    <span className="delivery-profile-status-dot" aria-hidden="true" />
                    <div>
                        <h2>{isDeliveryBoyActive ? "You are Online" : "You are Offline"}</h2>
                        <p>
                            {isDeliveryBoyActive
                                ? "You can receive new delivery assignments."
                                : "Go online when you are ready to deliver."}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="delivery-profile-status-toggle"
                    onClick={handleStatusChange}
                    disabled={deliveryBoyStatusLoading}
                    role="switch"
                    aria-checked={isDeliveryBoyActive}
                    aria-label="Toggle delivery availability"
                >
                    <span>
                        {deliveryBoyStatusLoading && (
                            <span className="delivery-profile-status-loader" aria-hidden="true" />
                        )}
                    </span>
                </button>
            </article>

            <section className="delivery-profile-info-section" aria-labelledby="profile-information-title">
                <div className="delivery-profile-section-heading">
                    <h2 id="profile-information-title">Profile information</h2>
                    <p>Your account contact details.</p>
                </div>

                <div className="delivery-profile-info-list">
                    <div className="delivery-profile-info-row">
                        <span className="delivery-profile-info-icon">
                            <LuCircleUserRound aria-hidden="true" />
                        </span>
                        <div>
                            <span>Full name</span>
                            <strong>{fullName}</strong>
                        </div>
                    </div>

                    <div className="delivery-profile-info-row">
                        <span className="delivery-profile-info-icon">
                            <LuPhone aria-hidden="true" />
                        </span>
                        <div>
                            <span>Mobile number</span>
                            <strong>{user?.mobileNumber || "Not available"}</strong>
                        </div>
                    </div>

                    <div className="delivery-profile-info-row">
                        <span className="delivery-profile-info-icon">
                            <LuMail aria-hidden="true" />
                        </span>
                        <div>
                            <span>Email address</span>
                            <strong>{user?.email || "Not available"}</strong>
                        </div>
                    </div>
                </div>
            </section>

            <Link className="delivery-profile-home-link" to="/home">
                Go to Home
                <LuArrowRight aria-hidden="true" />
            </Link>
        </section>
    );
};

export default DeliveryBoyProfile;
