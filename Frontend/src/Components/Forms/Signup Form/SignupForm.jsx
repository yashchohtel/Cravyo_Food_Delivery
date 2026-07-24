import ButtonLoader from "../../Loaders/ButtonLoader/ButtonLoader"
import GoogleAuth from "../GoogleAuth/GoogleAuth"
import { Eye, EyeClosed } from 'lucide-react';

const SignupForm = (props) => {

    // destructure props
    const {
        formData,          // signup form values
        errors,            // validation errors
        errorMessage,      // server error messages
        showPassword,      // password visibility
        setShowPassword,   // toggle password visibility
        handleInputChange, // update input values
        changeForm,        // switch auth forms
        formLoading,       // button loading state
        googleLoading,      // google popup loading state
        setGoogleLoading,  // update google loading state
    } = props;

    return (

        <>

            {/* full name input */}
            <div className="inputGroup">

                <label>Full Name</label>

                <input
                    type="text"
                    placeholder="Enter full name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                />

                {/* full name validation error */}
                {errors.fullName && <p className="inputError"> {errors.fullName} </p>}

            </div>

            {/* email input */}
            <div className="inputGroup">

                <label>Email</label>

                <input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />

                {/* email validation error */}
                {errors.email && <p className="inputError"> {errors.email} </p>}

                {/* email server error */}
                {errorMessage === "Email already exists" && (
                    <p className="inputError">{errorMessage}</p>
                )}

            </div>

            {/* mobile number input */}
            <div className="inputGroup">

                <label>Mobile Number</label>

                <input
                    type="tel"
                    placeholder="Enter mobile number"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                />

                {/* mobile number validation error */}
                {errors.mobileNumber && <p className="inputError"> {errors.mobileNumber} </p>}

                {/* mobile server error */}
                {errorMessage === "Mobile number already exists" && (
                    <p className="inputError">{errorMessage}</p>
                )}

            </div>

            {/* password input signup*/}
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

                {/* password validation error */}
                {errors.password && <p className="inputError"> {errors.password} </p>}

            </div>

            {/* create account button */}
            <button
                className="btn btnPrimary"
                type="submit"
                disabled={formLoading || googleLoading}
            >
                {formLoading ? <ButtonLoader /> : "Create Account"}
            </button>

            {/* google authentication button */}
            <GoogleAuth
                changeForm={changeForm}             // to change form and clear states
                formLoading={formLoading}           // formLoading 
                googleLoading={googleLoading}       // google popup loading state
                setGoogleLoading={setGoogleLoading} // update google loading state
            />

            {/* login form button */}
            <p className="bottomText">
                Already have an account?
                <span onClick={() => changeForm("login")}>
                    Login
                </span>
            </p>

        </>

    )

}
export default SignupForm