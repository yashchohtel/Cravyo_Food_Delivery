import { useEffect, useRef, useState } from "react"
import "./OtpInput.css"

const OtpInput = ({ length, onOtpChange, setErrors, errors }) => {

  // state to store otp
  const [otp, setOtp] = useState(new Array(length).fill(""));

  // use ref to store otp input refrence
  const inputRefs = useRef([])

  // function to handle nput change
  const handleInputChange = (index, e) => {

    // extract value
    const value = e.target.value;

    // allow only numbers
    if (!/^\d*$/.test(value)) {

      setErrors((prev) => ({
        ...prev,
        otp: "OTP must contain only numbers",
      }));

      return;
    }

    // clear error if there is error
    if (errors.otp) {
      setErrors((prev) => ({
        ...prev,
        otp: "",
      }));
    }

    // state to store fresh otp
    const newOtp = [...otp];

    // allow only one input
    newOtp[index] = value.substring(value.length - 1);

    // set otp
    setOtp(newOtp)

    // combined otp
    const combinedOtp = newOtp.join("");

    // send otp to parent component
    if (combinedOtp.length === length) {
      onOtpChange(combinedOtp);
    }

    // move focus to first empty input
    if (value) {

      // first empty input box
      const firstEmptyIndex = newOtp.indexOf("");

      if (firstEmptyIndex !== -1) {
        inputRefs.current[firstEmptyIndex].focus();
      }

    }

  }

  // function to handleKeyDown event 
  const handleKeyDown = (index, e) => {

    // backspace - input value delete
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }

    // Move focus to previous input
    if (e.key === "ArrowLeft" && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }

    // Move focus to next input
    if (e.key === "ArrowRight" && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
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

  // function to handle paste event
  const handlePaste = (e) => {

    // prevent default paste behavior
    e.preventDefault();

    // get pasted text
    const pastedData = e.clipboardData.getData("text");

    // Allow only numbers
    if (!/^\d+$/.test(pastedData)) {

      setErrors((prev) => ({
        ...prev,
        otp: `Only numbers are allowed.`,
      }));

      return;
    }

    // clear error if there is error
    if (errors.otp) {
      setErrors((prev) => ({
        ...prev,
        otp: "",
      }));
    }

    // take only required digits
    const pastedOtp = pastedData.slice(0, length).split("");

    // create new otp array
    const newOtp = [...otp];

    // update otp values
    pastedOtp.forEach((digit, index) => {
      newOtp[index] = digit;
    });

    // update state
    setOtp(newOtp);

    // send otp to parent
    onOtpChange(newOtp.join(""));

    // focus last pasted input
    const lastIndex = pastedOtp.length - 1;

    if (inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].focus();
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
                onPaste={handlePaste}
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