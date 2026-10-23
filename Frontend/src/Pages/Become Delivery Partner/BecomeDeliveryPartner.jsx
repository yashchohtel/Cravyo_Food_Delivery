import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LuBike, LuCarFront, LuMail, LuMapPin, LuPhone, LuUserRound } from "react-icons/lu";
import { becomeDeliveryPartner } from "../../features/auth/authThunk";
import "./BecomeDeliveryPartner.css";

const BecomeDeliveryPartner = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, formLoading } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        mobileNumber: user?.mobileNumber || "",
        vehicleType: "Bike",
        vehicleNumber: "",
        deliveryAddress: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentData) => ({ ...currentData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await dispatch(becomeDeliveryPartner(formData)).unwrap();
            toast.success(result.message);
            navigate("/delivery-boy", { replace: true });
        } catch (error) {
            toast.error(error || "Unable to become a delivery partner");
        }
    };

    return (
        <main className="delivery-partner-join-page">
            <section className="delivery-partner-join-card">
                <header className="delivery-partner-join-heading">
                    <span className="delivery-partner-join-icon"><LuBike aria-hidden="true" /></span>
                    <p>JOIN CRAVYO</p>
                    <h1>Become a delivery partner</h1>
                    <span>Fill in your details to start delivering orders.</span>
                </header>

                <form className="delivery-partner-join-form" onSubmit={handleSubmit}>
                    <label>
                        Full name <b>*</b>
                        <span className="delivery-partner-input"><LuUserRound aria-hidden="true" /><input name="fullName" value={formData.fullName} onChange={handleChange} required /></span>
                    </label>
                    <label>
                        Email address <b>*</b>
                        <span className="delivery-partner-input"><LuMail aria-hidden="true" /><input type="email" name="email" value={formData.email} onChange={handleChange} required /></span>
                    </label>
                    <label>
                        Mobile number <b>*</b>
                        <span className="delivery-partner-input"><LuPhone aria-hidden="true" /><input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required /></span>
                    </label>
                    <label>
                        Vehicle type <b>*</b>
                        <span className="delivery-partner-input"><LuCarFront aria-hidden="true" /><select name="vehicleType" value={formData.vehicleType} onChange={handleChange}><option>Bike</option><option>Scooter</option><option>Cycle</option></select></span>
                    </label>
                    <label>
                        Vehicle number
                        <span className="delivery-partner-input"><LuCarFront aria-hidden="true" /><input name="vehicleNumber" placeholder="e.g. MP 09 AB 1234" value={formData.vehicleNumber} onChange={handleChange} /></span>
                    </label>
                    <label className="delivery-partner-address-field">
                        Delivery address <b>*</b>
                        <span className="delivery-partner-input"><LuMapPin aria-hidden="true" /><textarea name="deliveryAddress" placeholder="Enter your delivery area or address" value={formData.deliveryAddress} onChange={handleChange} required /></span>
                    </label>
                    <button type="submit" disabled={formLoading}>{formLoading ? "Submitting..." : "Become a delivery partner"}</button>
                </form>
            </section>
        </main>
    );
};

export default BecomeDeliveryPartner;
