/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, sendLoginOtp, verifyLoginOtp } from "../../features/auth/authThunk.js";
import { clearMessages } from "../../features/auth/authSlice.js";
import toast from "react-hot-toast";
import FormHeader from "../../Components/Forms/Form Header/FormHeader.jsx";
import LoginForm from "../../Components/Forms/Login Form/LoginForm.jsx";
import SignupForm from "../../Components/Forms/Signup Form/SignupForm.jsx";
import SendOtpForm from "../../Components/Forms/Send Otp Form/SendOtpForm.jsx";
import VerifyOtpForm from "../../Components/Forms/VerifyOtpForm/VerifyOtpForm.jsx";

const Auth = () => {

  // initialize use dispatch
  const dispatch = useDispatch();

  /* -------------------------------------- */

  // getting required data from global store using useSelector
  const { formLoading, errorMessage, successMessage } = useSelector((state) => state.auth);

  /* -------------------------------------- */

  // state to toggle password visibility
  const [showPassword, setShowPassword] = useState(true);

  /* -------------------------------------- */

  // Initial form data
  const initialFormData = {
    fullName: "",
    email: "",
    mobileNumber: "",
    identifier: "",
    password: "",
    otp: "",
  };

  // state to hold form data
  const [formData, setFormData] = useState(initialFormData);

  /* -------------------------------------- */

  // state to toggle between register and login and login forms, initilize the current from from sessionstorage -
  // "login", "signup", "otp", "verifyOtp"
  const [currentForm, setCurrentForm] = useState(sessionStorage.getItem("authForm") || "login");

  // change form function to switch between forms
  const changeForm = (formName = currentForm) => {

    // clear error or success message from store
    dispatch(clearMessages())

    // set the current form to the new form name and reset errors
    setCurrentForm(formName);

    // save current form in sessionStorage to persist current form on page reload
    sessionStorage.setItem("authForm", formName);

    // reset errors when changing forms
    setErrors({});

    // reset form data when changing forms
    setFormData(initialFormData);

  };

  /* -------------------------------------- */

  // function to clear temperory session data
  const clearTempSessionData = () => {
    sessionStorage.removeItem("authForm");
    sessionStorage.removeItem("otpMobile");
    sessionStorage.removeItem("resendOtpAvailableAt");
  }

  /* -------------------------------------- */

  // handle input change for form fields
  const handleInputChange = (e) => {

    // Extract name and value from the input event
    const { name, value } = e.target;

    // Update the formData state with the new value for the corresponding field
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // function to get opt from otp input component and store in form data
  const handleOtpChange = (otp) => {

    // update otp on form data
    setFormData((prev) => ({
      ...prev,
      otp: otp,
    }));

  };

  /* -------------------------------------- */

  // state to store validation errors
  const [errors, setErrors] = useState({});

  // function to validate the form data based on the current form
  const validateForm = () => {

    // create a new errors object to hold validation errors
    const newErrors = {};

    // Validation for login form
    if (currentForm === "login") {

      // Identifier
      if (!formData.identifier.trim()) {
        newErrors.identifier = "Email or Mobile is required";
      }

      // Password
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      }

    }

    // Validation for signup form
    else if (currentForm === "signup") {

      // Full Name
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
      else if (formData.fullName.trim().length < 4) {
        newErrors.fullName = "Full name must be at least 4 characters";
      }

      // Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      }
      else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email address";
      }

      // Mobile Number
      const mobileRegex = /^[6-9]\d{9}$/;

      if (!formData.mobileNumber.trim()) {
        newErrors.mobileNumber = "Mobile number is required";
      }
      else if (!mobileRegex.test(formData.mobileNumber)) {
        newErrors.mobileNumber = "Enter a valid mobile number";
      }

      // Password
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      }
      else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      else if (!passwordRegex.test(formData.password)) {
        newErrors.password = "Password must contain uppercase, lowercase, number and special character";
      }

    }

    // login with otp form validation
    else if (currentForm === "otp") {

      const mobileRegex = /^[6-9]\d{9}$/;

      if (!formData.mobileNumber.trim()) {
        newErrors.mobileNumber = "Mobile number is required";
      }
      else if (!mobileRegex.test(formData.mobileNumber)) {
        newErrors.mobileNumber = "Enter a valid mobile number";
      }

    }

    // verify otp form validation
    else if (currentForm === "verifyOtp") {

      if (!formData.otp.trim()) {
        newErrors.otp = "OTP is required";
      }
      else if (formData.otp.length !== 4) {
        newErrors.otp = "Enter a valid 4-digit OTP";
      }
      else if (!/^\d+$/.test(formData.otp)) {
        newErrors.otp = "OTP must contain only numbers";
      }

    }

    // set the errors state with the new errors object
    setErrors(newErrors);

    // return errors object to indicate if there are any validation errors
    return newErrors;

  };

  /* -------------------------------------- */

  // handle form submission
  const handleFormSubmit = async (e) => {

    // Prevent the default form submission behavior
    e.preventDefault();

    // call validateForm to check for validation errors and store them in newErrors
    const newErrors = validateForm();

    // If there are validation errors, do not proceed with form submission
    if (Object.keys(newErrors).length > 0) return;

    // -------------------

    // login form submission 
    if (currentForm === "login") {

      // dispatch Login thunk
      const result = await dispatch(loginUser({
        identifier: formData.identifier,
        password: formData.password,
      }));

      // on login fulfilled
      if (loginUser.fulfilled.match(result)) {

        // clear session temp data
        clearTempSessionData();

      }

    }

    // signup form submission 
    else if (currentForm === "signup") {

      // dispatch register user thunk
      const result = await dispatch(registerUser({
        fullName: formData.fullName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        password: formData.password,
      }));

      // on signup fulfilled
      if (registerUser.fulfilled.match(result)) {

        // clear session temp data
        clearTempSessionData();

      }

    }

    // login with otp form submission
    else if (currentForm === "otp") {

      // Send OTP API
      const result = await dispatch(
        sendLoginOtp({ mobileNumber: formData.mobileNumber })
      );

      // change form and set mobile numbe in session storage for otp verification
      if (sendLoginOtp.fulfilled.match(result)) {

        // Save mobile number
        sessionStorage.setItem("otpMobile", formData.mobileNumber);

        // resend otp time (start countdown when opt send successfull)
        sessionStorage.setItem("resendOtpAvailableAt", Date.now() + 45 * 1000);

        // change form
        changeForm("verifyOtp");
      }

    }

    // verify otp form submission
    else if (currentForm === "verifyOtp") {

      // Get mobile number from session storage
      const mobileNumber = sessionStorage.getItem("otpMobile");

      // Verify OTP API
      const result = await dispatch(verifyLoginOtp({
        mobileNumber,
        otp: formData.otp,
      }));

      // on verification fulfilled
      if (verifyLoginOtp.fulfilled.match(result)) {

        // clear session temp data
        clearTempSessionData();

      }

    }

  };

  /* -------------------------------------- */

  // state to handle google authenticatin loading
  const [googleLoading, setGoogleLoading] = useState(false);

  /* -------------------------------------- */

  // effect to show toast on api success
  useEffect(() => {

    // return if successMessage is null
    if (!successMessage) return;

    // show toast on otp send
    if (successMessage === "OTP sent successfully") {
      toast.success("OTP sent to mail!");
    }

    // show toast on logout
    if (successMessage === "Logged out successfully") {
      toast.success("Logged out !");
    }

    // clear state success/error message
    dispatch(clearMessages());

  }, [successMessage, dispatch]);

  /* -------------------------------------- */

  // effect to refill mobile number input in OTP form on change number or resend opt click
  useEffect(() => {

    // return if current form is not otp
    if (currentForm !== "otp") return;

    // get mobile number from session storage
    const otpMobile = sessionStorage.getItem("otpMobile");

    // if no mobile number return
    if (!otpMobile) return;

    // set mobile number in form data
    setFormData((prev) => ({
      ...prev,
      mobileNumber: otpMobile,
    }));

  }, [currentForm]);

  /* -------------------------------------- */

  return (

    <>

      {/* authpage */}
      <div className="authPage">

        {/* container */}
        <div className="authContainer container">

          {/* form header */}
          <FormHeader currentForm={currentForm} />

          {/* Form */}
          <form className="authForm" onSubmit={(e) => handleFormSubmit(e)}>

            {/* login form */}
            {currentForm === "login" && (

              <LoginForm
                formData={formData}                   // login form values
                errors={errors}                       // validation errors
                errorMessage={errorMessage}           // server error messages
                showPassword={showPassword}           // password visibility
                setShowPassword={setShowPassword}     // toggle password visibility
                handleInputChange={handleInputChange} // update input values
                changeForm={changeForm}               // switch auth forms
                formLoading={formLoading}             // button loading state
                googleLoading={googleLoading}         // google popup loading state
                setGoogleLoading={setGoogleLoading}   // update google loading state
              />

            )}

            {/* signup form */}
            {currentForm === "signup" && (

              <SignupForm
                formData={formData}                   // signup form values
                errors={errors}                       // validation errors
                errorMessage={errorMessage}           // server error messages
                showPassword={showPassword}           // password visibility
                setShowPassword={setShowPassword}     // toggle password visibility
                handleInputChange={handleInputChange} // update input values
                changeForm={changeForm}               // switch auth forms
                formLoading={formLoading}             // button loading state
                googleLoading={googleLoading}         // google popup loading state
                setGoogleLoading={setGoogleLoading}   // update google loading state
              />

            )}

            {/* login with otp form */}
            {currentForm === "otp" && (

              <SendOtpForm
                formData={formData}                   // otp form values
                errors={errors}                       // validation errors
                errorMessage={errorMessage}           // server error messages
                handleInputChange={handleInputChange} // update input values
                changeForm={changeForm}               // switch auth forms
                formLoading={formLoading}             // button loading state
                googleLoading={googleLoading}         // google popup loading state
                setGoogleLoading={setGoogleLoading}   // update google loading state
              />

            )}

            {/* verify otp form */}
            {currentForm === "verifyOtp" && (

              <VerifyOtpForm
                currentForm={currentForm}          // current form
                errors={errors}                    // validation errors
                errorMessage={errorMessage}        // server error messages
                formLoading={formLoading}          // button loading state
                handleOtpChange={handleOtpChange}  // update otp value
                setErrors={setErrors}              // update validation errors
                changeForm={changeForm}            // switch auth forms
              />

            )}

          </form>

        </div>

      </div>

    </>

  );

}

export default Auth