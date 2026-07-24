import ButtonLoader from "../../Loaders/ButtonLoader/ButtonLoader"
import GoogleAuth from "../GoogleAuth/GoogleAuth"

const SendOtpForm = (props) => {

    // destructure props
    const {
        formData,          // otp form values
        errors,            // validation errors
        errorMessage,      // server error messages
        handleInputChange, // update input values
        changeForm,        // switch auth forms
        formLoading,       // button loading state
        googleLoading,      // google popup loading state
        setGoogleLoading,  // update google loading state
    } = props;

    return (

        <>

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

                {/* Mobile server error */}
                {errorMessage === "No account found with this mobile number." && (
                    <p className="inputError"> {errorMessage} </p>
                )}

            </div>

            {/* send otp button */}
            <button
                className="btn btnPrimary"
                type="submit"
                disabled={formLoading || googleLoading}
            >
                {formLoading ? <ButtonLoader /> : "Send OTP"}
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
                Login using Password?
                <span onClick={() => changeForm("login")}>
                    Login
                </span>
            </p>

        </>

    )

}
export default SendOtpForm