/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import { Eye, EyeClosed } from 'lucide-react';
import ButtonLoader from "../../Components/Loaders/ButtonLoader/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, sendLoginOtp, verifyLoginOtp } from "../../features/auth/authThunk.js";
import { clearMessages } from "../../features/auth/authSlice.js";
import toast from "react-hot-toast";
import OtpInput from "../../Components/OtpInput/OtpInput.jsx";
import GoogleAuth from "../../Components/GoogleAuth/GoogleAuth.jsx";

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

  // state to toggle between register and login and login forms, initilize the current from from sessionstorage
  // "login", "signup", "otp", "verifyOtp"
  const [currentForm, setCurrentForm] = useState(sessionStorage.getItem("authForm") || "login");

  // change form function to switch between forms
  const changeForm = (formName) => {

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

  // function to get opt from otp input object and store in form data
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

  // state to store time left to show resend OTP clink
  const [timeLeft, setTimeLeft] = useState(0);

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

  // effect to show resend otp countdown
  useEffect(() => {

    // if current form is not verify otp return
    if (currentForm !== "verifyOtp") return;

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

  }, [currentForm]);

  return (

    <>

      {/* authpage */}
      <div className="authPage">

        {/* container */}
        <div className="authContainer container">

          {/* Logo */}
          <div className="authLogo">
            <img src="/logosmall.png" alt="Cravyo" />
          </div>

          {/* Heading */}
          <div className="authHeading">

            <h2>
              {currentForm === "login" && "Welcome Back"}
              {currentForm === "signup" && "Create Account"}
              {currentForm === "otp" && "Login with OTP"}
              {currentForm === "verifyOtp" && "Verify OTP"}
            </h2>

            <p>
              {currentForm === "login" && "Login to continue ordering delicious food."}
              {currentForm === "signup" && "Create your Cravyo account."}
              {currentForm === "otp" && "Enter your mobile number."}
              {currentForm === "verifyOtp" && "Enter the 4-digit OTP sent to your email."}
            </p>

          </div>

          {/* Form */}
          <form className="authForm" onSubmit={(e) => handleFormSubmit(e)}>

            {/* login form */}
            {currentForm === "login" && (

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

                  {/* password error */}
                  {errors.password && <p className="inputError"> {errors.password} </p>}

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
                  disabled={formLoading}
                >
                  {formLoading ? <ButtonLoader /> : "Login"}
                </button>

                {/* forgot password button */}
                <Link to="/forgotPass" className="forgotPasswordText">
                  Forgot Password?
                </Link>

                {/* google authentication button */}
                <GoogleAuth
                  changeForm={changeForm} // function to clear state
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

            )}

            {/* signup form */}
            {currentForm === "signup" && (

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

                  {/* full name error */}
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

                  {/* email error */}
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

                  {/* mobile number error */}
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

                  {/* password error */}
                  {errors.password && <p className="inputError"> {errors.password} </p>}

                </div>

                {/* create account button */}
                <button
                  className="btn btnPrimary"
                  type="submit"
                  disabled={formLoading}
                >
                  {formLoading ? <ButtonLoader /> : "Create Account"}
                </button>

                {/* google authentication button */}
                <GoogleAuth />

                {/* login form button */}
                <p className="bottomText">
                  Already have an account?
                  <span onClick={() => changeForm("login")}>
                    Login
                  </span>
                </p>

              </>

            )}

            {/* login with otp form */}
            {currentForm === "otp" && (

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

                  {/* mobile number error */}
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
                  disabled={formLoading}
                >
                  {formLoading ? <ButtonLoader /> : "Send OTP"}
                </button>

                {/* google authentication button */}
                <GoogleAuth />

                {/* login form button */}
                <p className="bottomText">
                  Login using Password?
                  <span onClick={() => changeForm("login")}>
                    Login
                  </span>
                </p>

              </>

            )}

            {/* verify otp form */}
            {currentForm === "verifyOtp" && (

              <>

                {/* enter otp input component */}
                <OtpInput
                  length={4}
                  onOtpChange={handleOtpChange} // to set otp
                  setErrors={setErrors} // to set otp validation error
                  errors={errors} // validation errors object
                />

                {/* mobile number error */}
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

            )}

          </form>

        </div>

      </div>

    </>

  );
}

export default Auth