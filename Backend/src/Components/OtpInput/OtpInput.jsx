import { useEffect, useRef, useState } from "react"
import "./OtpInput.css"

const OtpInput = ({ length }) => {

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

    // // move to next input if current filled is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }

  }

  // function to hanle input click
  const handleInputClick = () => {

  }

  // function to handleKeyDown event
  const handleKeyDown = (index, e) => {

    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
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
                onClick={() => handleInputClick()}
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