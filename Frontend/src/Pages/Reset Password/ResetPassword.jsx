import { useState } from 'react';
import './ResetPassword.css'
import { Eye, EyeClosed } from 'lucide-react';
import ButtonLoader from '../../Components/Loaders/ButtonLoader/ButtonLoader';
import { useSelector } from 'react-redux';

const ResetPassword = () => {


    // getting required data from global store using useSelector
    const { formLoading } = useSelector((state) => state.auth);

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

    return (
        <>
            {/* authpage */}
            <div className="authPage resetPasswordPage">

                {/* container */}
                <div className="authContainer container">

                    {/* Form */}
                    <form className="authForm" >

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