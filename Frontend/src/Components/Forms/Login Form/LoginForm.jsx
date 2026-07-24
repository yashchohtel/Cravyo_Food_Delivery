import { Link } from "react-router-dom";
import ButtonLoader from "../../Loaders/ButtonLoader/ButtonLoader";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { Eye, EyeClosed } from 'lucide-react';

const LoginForm = (props) => {

    // destructure props
    const {
        formData,            // login form values
        errors,              // validation errors
        errorMessage,        // server error messages
        showPassword,        // password visibility
        setShowPassword,     // toggle password visibility
        handleInputChange,   // update input values
        changeForm,          // switch auth forms
        formLoading,         // button loading state
        googleLoading,       // google popup loading state
        setGoogleLoading,    // update google loading state
        clearTempSessionData //clear temperory session data
    } = props;

    return (
        <>

            {/* identifiers */}
            <div className="inputGroup">

                {/* label */}
                <label>Email or Mobile</label>

                {/* identifiers input field */}
                <input
                    type="text"
                    placeholder="Enter email or mobile"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleInputChange}
                />

                {/* identifier error message */}
                {errors.identifier && <p className="inputError"> {errors.identifier} </p>}

            </div>

            {/* login password */}
            <div className="inputGroup">

                <label>Password</label>

                {/* input wrapper */}
                <div className="inputWrapper">

                    {/* password input */}
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />

                    {/* eye icon */}
                    {showPassword ?
                        <Eye className="eyeIcon" onClick={() => setShowPassword(false)} />
                        :
                        <EyeClosed className="eyeIcon" onClick={() => setShowPassword(true)} />
                    }

                </div>

                {/* validation password error */}
                {errors.password && <p className="inputError"> {errors.password} </p>}

                {/* server error */}
                {errorMessage === "Invalid email/mobile number or password" && (
                    <p className="inputError">{errorMessage}</p>
                )}

                {/* This email is registered with Google. Use "Continue with Google". */}
                {/* email server error */}
                {errorMessage === "Please login with Google." && (
                    <p className="inputError">This email is registered with Google. Use "Continue with Google".</p>
                )}

            </div>

            {/* login button */}
            <button
                className="btn btnPrimary"
                type="submit"
                disabled={formLoading || googleLoading}
            >
                {formLoading ? <ButtonLoader /> : "Login"}
            </button>

            {/* forgot password button */}
            <Link
                to="/forgotPass"
                className="forgotPasswordText"
                onClick={() => changeForm()}
            >
                Forgot Password?
            </Link>

            {/* google authentication button */}
            <GoogleAuth
                changeForm={changeForm}                     // to change form and clear states
                formLoading={formLoading}                   // formLoading 
                googleLoading={googleLoading}               // google popup loading state
                setGoogleLoading={setGoogleLoading}         // update google loading state
                clearTempSessionData={clearTempSessionData} // clear temperory session data
            />

            {/* login with otp button */}
            <p className="otpLoginText" onClick={() => changeForm("otp")} >
                Login with OTP
            </p>

            {/* signup form button */}
            <p className="bottomText">
                Don't have an account?

                <span onClick={() => changeForm("signup")}>
                    Sign Up
                </span>

            </p>

        </>
    )

}
export default LoginForm;