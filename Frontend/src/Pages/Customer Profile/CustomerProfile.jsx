import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LuBike, LuCamera, LuChevronRight, LuCircleUserRound, LuKeyRound, LuMail, LuPhone, LuStore } from "react-icons/lu";
import { updateProfileImage } from "../../features/auth/authThunk";
import "./CustomerProfile.css";

const CustomerProfile = () => {
    const dispatch = useDispatch();
    const { user, formLoading } = useSelector((state) => state.auth);
    const imageInputRef = useRef(null);
    const [imageFailed, setImageFailed] = useState(false);

    const fullName = user?.fullName || "Customer";
    const firstLetter = fullName.charAt(0).toUpperCase();
    const isRestaurantOwner = user?.roles?.includes("restaurantOwner");
    const isDeliveryPartner = user?.roles?.includes("deliveryBoy");

    const handleImageChange = async (event) => {
        const selectedImage = event.target.files?.[0];

        if (!selectedImage) return;

        try {
            const result = await dispatch(updateProfileImage(selectedImage)).unwrap();
            setImageFailed(false);
            toast.success(result.message);
        } catch (error) {
            toast.error(error || "Unable to update profile photo");
        } finally {
            event.target.value = "";
        }
    };

    return (
        <main className="customer-profile-page">
            <section className="customer-profile-content">
                <header className="customer-profile-heading">
                    <p>MY ACCOUNT</p>
                    <h1>Profile</h1>
                </header>

                <section className="customer-profile-summary">
                    <div className="customer-profile-avatar">
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

                    <input
                        ref={imageInputRef}
                        className="customer-profile-image-input"
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        className="customer-profile-photo-button"
                        onClick={() => imageInputRef.current?.click()}
                        disabled={formLoading}
                    >
                        <LuCamera aria-hidden="true" />
                        {formLoading ? "Uploading..." : "Change photo"}
                    </button>

                    <h2>{fullName}</h2>
                    <p>Cravyo customer</p>
                </section>

                <section className="customer-profile-details" aria-labelledby="customer-profile-details-title">
                    <div className="customer-profile-details-heading">
                        <h2 id="customer-profile-details-title">Personal information</h2>
                        <p>Your account contact details.</p>
                    </div>

                    <div className="customer-profile-details-list">
                        <div className="customer-profile-detail-row">
                            <span className="customer-profile-detail-icon"><LuCircleUserRound aria-hidden="true" /></span>
                            <div><span>Full name</span><strong>{fullName}</strong></div>
                        </div>
                        <div className="customer-profile-detail-row">
                            <span className="customer-profile-detail-icon"><LuPhone aria-hidden="true" /></span>
                            <div><span>Mobile number</span><strong>{user?.mobileNumber || "Not available"}</strong></div>
                        </div>
                        <div className="customer-profile-detail-row">
                            <span className="customer-profile-detail-icon"><LuMail aria-hidden="true" /></span>
                            <div><span>Email address</span><strong>{user?.email || "Not available"}</strong></div>
                        </div>
                    </div>
                </section>

                <Link className="customer-profile-password-link" to="/forgotPass">
                    <span className="customer-profile-detail-icon"><LuKeyRound aria-hidden="true" /></span>
                    <span>
                        <strong>Change password</strong>
                        <small>Get a reset link on your email.</small>
                    </span>
                    <LuChevronRight aria-hidden="true" />
                </Link>

                <section className="customer-profile-actions" aria-label="Account options">
                    <Link
                        className="customer-profile-action-card"
                        to={isRestaurantOwner ? "/restaurant/admin-panel" : "/restaurant/create"}
                    >
                        <span className="customer-profile-detail-icon"><LuStore aria-hidden="true" /></span>
                        <span>
                            <strong>{isRestaurantOwner ? "Go to your restaurant" : "Create your restaurant"}</strong>
                            <small>
                                {isRestaurantOwner
                                    ? "Manage your restaurant and orders."
                                    : "Bring your restaurant to Cravyo."}
                            </small>
                        </span>
                        <LuChevronRight aria-hidden="true" />
                    </Link>

                    {isDeliveryPartner ? (
                        <Link className="customer-profile-action-card" to="/delivery-boy">
                            <span className="customer-profile-detail-icon"><LuBike aria-hidden="true" /></span>
                            <span>
                                <strong>Go to delivery partner page</strong>
                                <small>Check your deliveries and earnings.</small>
                            </span>
                            <LuChevronRight aria-hidden="true" />
                        </Link>
                    ) : (
                        <Link className="customer-profile-action-card" to="/delivery-boy/join">
                            <span className="customer-profile-detail-icon"><LuBike aria-hidden="true" /></span>
                            <span>
                                <strong>Become a delivery partner</strong>
                                <small>Deliver orders and earn with Cravyo.</small>
                            </span>
                            <LuChevronRight aria-hidden="true" />
                        </Link>
                    )}
                </section>

            </section>
        </main>
    );
};

export default CustomerProfile;
