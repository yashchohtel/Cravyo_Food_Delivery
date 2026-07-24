/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect } from "react";
import ButtonLoader from "../../Loaders/ButtonLoader/ButtonLoader"
import OtpInput from "../Otp Input/OtpInput"
import { useState } from "react";

const VerifyOtpForm = (props) => {

    // destructure props
    const {
        errorMessage,    // server error messages
        formLoading,     // button loading state
        handleOtpChange, // update otp value
        errors,          // validation errors
        setErrors,       // update validation errors
        changeForm,      // switch auth forms
    } = props;


    // state to store time left to show resend OTP clink
    const [timeLeft, setTimeLeft] = useState(0);

    /* -------------------------------------- */

    // effect to show resend otp countdown
    useEffect(() => {

        // get the resend otp countdown time
        const resendOtpAvailableAt = Number(sessionStorage.getItem("resendOtpAvailableAt"));

        // remaining time
        const remainingTime = Math.max(0, Math.ceil((resendOtpAvailableAt - Date.now()) / 1000));

        // set time left
        setTimeLeft(remainingTime);

        // set interval to update countdown time
        const interval = setInterval(() => {

            // calculate remaning time every second
            const remainingTime = Math.max(0, Math.ceil((resendOtpAvailableAt - Date.now()) / 1000));

            // set remaining time
            setTimeLeft(remainingTime);

            // clear interval when remainingTime is zero
            if (remainingTime <= 0) {
                clearInterval(interval);
            }

        }, 1000);

        // clear interval
        return () => clearInterval(interval);

    }, []);

    return (

        <>

            {/* enter otp input component */}
            <OtpInput
                length={4}
                onOtpChange={handleOtpChange} // to set otp
                setErrors={setErrors} // to set otp validation error
                errors={errors} // validation errors object
            />

            {/* mobile number validation error */}
            {errors.otp && <p className="inputError errTextCenter"> {errors.otp} </p>}

            {/* verify otp server error - invalid otp*/}
            {errorMessage === "Invalid OTP." && (
                <p className="inputError errTextCenter"> {errorMessage} </p>
            )}

            {/* verify otp server error - expired otp */}
            {errorMessage === "OTP has expired." && (
                <p className="inputError errTextCenter"> {errorMessage} </p>
            )}

            {/* verify otp button */}
            <button
                className="btn btnPrimary"
                type="submit"
                disabled={formLoading}
            >
                {formLoading ? <ButtonLoader /> : "Verify OTP"}
            </button>

            {/* change mobile number button */}
            <p className="bottomText">
                Wrong mobile number?
                <span onClick={() => changeForm("otp")}>
                    Change Number
                </span>
            </p>

            {/* resend otp button */}
            <p className="bottomText">
                {timeLeft > 0 ?
                    <> Resend OTP in : <span className="timer">{timeLeft}s</span></>
                    :
                    <> Didn't receive OTP? <span onClick={() => changeForm("otp")} >Resend OTP</span></>
                }
            </p>

        </>
    )

}

export default VerifyOtpForm