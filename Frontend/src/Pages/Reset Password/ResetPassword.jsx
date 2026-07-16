import { useEffect, useState } from 'react';
import './ResetPassword.css'
import { Eye, EyeClosed } from 'lucide-react';
import ButtonLoader from '../../Components/Loaders/ButtonLoader/ButtonLoader';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { verifyResetToken } from '../../features/auth/authThunk';

const ResetPassword = () => {

    // initialize use dispatch
    const dispatch = useDispatch();

    /* -------------------------------------- */

    // getting required data from global store using useSelector
    const { formLoading, verifyTokenLoading, isResetTokenValid, } = useSelector((state) => state.auth);

    /* -------------------------------------- */

    // get token from url params
    const { token } = useParams();

    /* -------------------------------------- */

    // state to toggle password visibility
    const [showPassword, setShowPassword] = useState(true);

    /* -------------------------------------- */

    // form data
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    /* -------------------------------------- */

    // validation errors
    const [errors, setErrors] = useState({});

    /* -------------------------------------- */

    // handle input change
    const handleInputChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // clear error while typing
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

    };

    /* -------------------------------------- */

    // handle form submission
    const handleFormSubmit = async (e) => {

        // Prevent default form submission
        e.preventDefault();

        // Store validation errors
        const newErrors = {};

        // Password regex
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        // Password validation
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password must contain 8 characters, uppercase, lowercase, number and special character";
        }

        // Confirm password validation
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirm password is required";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        // Set errors
        setErrors(newErrors);

        // Stop if validation fails
        if (Object.keys(newErrors).length > 0) return;

        // Reset password API call

    };

    /* -------------------------------------- */

    // effeto to verify rest token on page load
    useEffect(() => {

        dispatch(verifyResetToken(token));

    }, [dispatch, token]);

    return (
        <>
            {/* authpage */}
            <div className="authPage resetPasswordPage">

                {/* container */}
                <div className="authContainer resetPassContainer container">

                    {/* Form */}
                    <form
                        className="authForm"
                        onSubmit={(e) => handleFormSubmit(e)}
                        noValidate
                    >

                        {/* Logo */}
                        <div className="authLogo">
                            <img src="/logosmall.png" alt="Cravyo" />
                        </div>

                        {/* Heading */}
                        <div className="authHeading">
                            <h2>Reset Password</h2>
                            <p>Enter new password to reset.</p>
                        </div>

                        {/* password input */}
                        <div className="inputGroup">

                            <label>Password</label>

                            <div className="inputWrapper">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />

                                {showPassword ? (
                                    <Eye
                                        className="eyeIcon"
                                        onClick={() => setShowPassword(false)}
                                    />
                                ) : (
                                    <EyeClosed
                                        className="eyeIcon"
                                        onClick={() => setShowPassword(true)}
                                    />
                                )}

                            </div>

                            {errors.password && (
                                <p className="inputError">{errors.password}</p>
                            )}

                        </div>

                        {/* confirm password input */}
                        <div className="inputGroup">

                            <label>Confirm Password</label>

                            <div className="inputWrapper">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />

                                {showPassword ? (
                                    <Eye
                                        className="eyeIcon"
                                        onClick={() => setShowPassword(false)}
                                    />
                                ) : (
                                    <EyeClosed
                                        className="eyeIcon"
                                        onClick={() => setShowPassword(true)}
                                    />
                                )}

                            </div>

                            {errors.confirmPassword && (
                                <p className="inputError">{errors.confirmPassword}</p>
                            )}

                        </div>

                        {/* Reset Password button */}
                        <button
                            className="btn btnPrimary"
                            type="submit"
                            disabled={formLoading}
                        >
                            {formLoading ? <ButtonLoader /> : "Reset Password"}
                        </button>

                    </form>

                </div>

            </div>
        </>
    )

}

export default ResetPassword

