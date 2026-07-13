import { useEffect, useRef, useState } from "react"
import "./OtpInput.css"

const OtpInput = ({ length, onOtpChange }) => {

  // state to store otp
  const [otp, setOtp] = useState(new Array(length).fill(""));

  // use ref to store otp input refrence
  const inputRefs = useRef([])

  // function to handle nput change
  const handleInputChange = (index, e) => {

    // extract value
    const value = e.target.value;

    // if value is not a number return
    if (isNaN(value)) return;

    const newOtp = [...otp];

    // allow only one input
    newOtp[index] = value.substring(value.length - 1);

    // set otp
    setOtp(newOtp)

    // combined otp
    const combinedOtp = newOtp.join("");

    // send otp to parent component
    onOtpChange(combinedOtp);

    // move to next input if current filled is filled
    if (index < length - 1 && !newOtp[index + 1] && inputRefs.current[index + 1]) {
      inputRefs.current[newOtp.indexOf("")].focus();
    }

  }

  // function to handleKeyDown event (backspace - input value delete)
  const handleKeyDown = (index, e) => {

    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }

  }

  // function to hanle input click
  const handleInputClick = (index) => {

    // Keep cursor at the end of the current input
    inputRefs.current[index].setSelectionRange(1, 1);

    // Prevent users from skipping empty OTP boxes
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }

  }

  /* ----------------------------- */

  // effect to focus in first input element
  useEffect(() => {

    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

  }, [])

  return (

    <>

      <div className="otpInput">

        {
          otp.map((value, index) => {
            return (
              <input type="text"
                key={index}
                type="text"
                value={value}
                ref={(input) => inputRefs.current[index] = input}
                onChange={(e) => handleInputChange(index, e)}
                onClick={() => handleInputClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="input"
              />
            )
          })
        }

      </div>
    </>

  )
}
export default OtpInput