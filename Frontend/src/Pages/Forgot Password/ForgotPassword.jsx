import { useDispatch, useSelector } from 'react-redux';
import ButtonLoader from '../../Components/Loaders/ButtonLoader/ButtonLoader'
import './ForgotPassword.css'
import { useEffect, useState } from 'react';
import { sendPasswordResetLink } from '../../features/auth/authThunk';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { clearMessages } from '../../features/auth/authSlice';

const ForgotPassword = () => {

    // initialize use navigate
    const navigate = useNavigate();

    /* -------------------------------------- */

    // initialize use dispatch
    const dispatch = useDispatch();

    /* -------------------------------------- */

    // getting required data from global store using useSelector
    const { formLoading, errorMessage, successMessage } = useSelector((state) => state.auth);

    /* -------------------------------------- */

    // form to store form data
    const [formData, setFormData] = useState({
        email: ""
    });

    // handle input change for form fields
    const handleInputChange = (e) => {

        // Extract name and value from the input event
        const { name, value } = e.target;

        // Update the formData state with the new value for the corresponding field
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // clear error
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

    };

    /* -------------------------------------- */

    // state to store validation errors
    const [errors, setErrors] = useState({});

    // state to store link send succes status
    const [isLinkSent, setIsLinkSent] = useState(false);

    /* -------------------------------------- */

    // handle form submission
    const handleFormSubmit = async (e) => {

        // Prevent the default form submission behavior
        e.preventDefault();

        // to hold email validation error
        const newErrors = {};

        // email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // empty email input validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        // valida email validation
        else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        // setting errors
        setErrors(newErrors);

        // return if there is any error
        if (Object.keys(newErrors).length > 0) return;

        // Send password reset link API call
        const result = await dispatch(sendPasswordResetLink({
            email: formData.email,
        }));

        if (sendPasswordResetLink.fulfilled.match(result)) {
            setFormData({ email: "" });
            setIsLinkSent(true);
        }

    }

    /* -------------------------------------- */

    // effect to show toast on api success
    useEffect(() => {

        // return if successMessage is null
        if (!successMessage) return;

        // show toast on otp send
        if (successMessage === "Reset link sent.") {
            toast.success("Reset link sent!");
        }

        // clear state success/error message
        dispatch(clearMessages());

    }, [successMessage, dispatch]);

    return (

        <>
            {/* forgotPassPage */}
            <div className="forgotPassPage">

                {/* goback button */}
                <div className="goback" onClick={() => navigate(-1)}>
                    <FaArrowLeftLong className="backIcon" />
                </div>

                {/* container */}
                <div className="forgotPassCont container">

                    {/* Logo */}
                    <div className="forgotPassLogo">
                        <img src="/logosmall.png" alt="Cravyo" />
                    </div>

                    {/* Heading */}
                    <div className="authHeading">
                        <h2>Forgot Password</h2>
                        <p>Send password reset link</p>
                    </div>

                    {/* ForgotPassword link share form */}
                    <form
                        className="forgotPassForm"
                        onSubmit={(e) => handleFormSubmit(e)}
                        noValidate
                    >

                        {/* email input */}
                        <div className="inputGroup">

                            <label>Email</label>

                            <input
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                noValidate
                            />

                            {/* email error */}
                            {errors.email && <p className="inputError"> {errors.email} </p>}

                            {/* email server error */}
                            {errorMessage === "No account found with this email." && (
                                <p className="inputError">{errorMessage}</p>
                            )}

                        </div>

                        {/* Send Reset Link button */}
                        <button
                            className="btn btnPrimary"
                            type="submit"
                            disabled={formLoading}
                        >
                            {formLoading ? <ButtonLoader /> : "Send Reset Link"}
                        </button>

                        {/* success text */}
                        {isLinkSent && (
                            <p className="successText">
                                Password reset link sent to your email.
                            </p>
                        )}

                        {isLinkSent && (
                            <p className="bottomText">
                                Back to <span onClick={() => navigate("/")}>Login</span>
                            </p>
                        )}

                    </form>

                </div>

            </div>
        </>
    )

}

export default ForgotPassword