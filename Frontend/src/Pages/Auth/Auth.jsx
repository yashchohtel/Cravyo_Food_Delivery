import { useState } from "react";
import "./Auth.css";
import { Eye, EyeClosed } from 'lucide-react';
import ButtonLoader from "../../Components/Loaders/ButtonLoader/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, sendLoginOtp } from "../../features/auth/authThunk.js";
import { clearMessages } from "../../features/auth/authSlice.js";
import { useEffect } from "react";

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

  // state to toggle between register and login and login forms - "login", "signup", "otp", "verifyOtp"
  const [currentForm, setCurrentForm] = useState("login");

  // change form function to switch between forms
  const changeForm = (formName) => {

    // clear error or success message from store
    dispatch(clearMessages())

    // set the current form to the new form name and reset errors
    setCurrentForm(formName);

    // reset errors when changing forms
    setErrors({});

    // reset form data when changing forms
    setFormData(initialFormData);

  };

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

    // set the errors state with the new errors object
    setErrors(newErrors);

    // return errors object to indicate if there are any validation errors
    return newErrors;

  };

  /* -------------------------------------- */

  // handle form submission
  const handleFormSubmit = (e) => {

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
      dispatch(loginUser({
        identifier: formData.identifier,
        password: formData.password,
      }));

    }

    // signup form submission 
    else if (currentForm === "signup") {

      // dispatch register user thunk
      dispatch(registerUser({
        fullName: formData.fullName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        password: formData.password,
      }));

    }

    // login with otp form submission
    else if (currentForm === "otp") {

      // Send OTP API
      dispatch(sendLoginOtp({
        mobileNumber: formData.mobileNumber,
      }));

    }

    // verify otp form submission
    else if (currentForm === "verifyOtp") {
      // Verify OTP API
    }

  };

  useEffect(() => {
    console.log("success: " + successMessage);
    console.log("error: " + errorMessage);
  }, [successMessage, errorMessage])

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
              {currentForm === "verifyOtp" && "Enter the OTP sent to your email."}
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

                </div>

                {/* login button */}
                <button className="btn btnPrimary" type="submit">
                  {formLoading ? <ButtonLoader /> : "Login"}
                </button>

                {/* forgot password button */}
                <p className="forgotPasswordText">
                  Forgot Password?
                </p>

                {/* continue with google button */}
                <button className="btn btnGoogle">
                  <img src="/googleLogo.png" alt="Google" />
                  Continue with Google
                </button>

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
                <button className="btn btnPrimary" type="submit">
                  {formLoading ? <ButtonLoader /> : "Create Account"}
                </button>

                {/* Google Login Button */}
                <button className="btn btnGoogle">
                  <img src="/googleLogo.png" alt="Google" />
                  Continue with Google
                </button>

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
                <button className="btn btnPrimary" type="submit" >
                  {formLoading ? <ButtonLoader /> : "Send OTP"}
                </button>

                {/* continue with google button */}
                <button className="btn btnGoogle">
                  <img src="/googleLogo.png" alt="Google" />
                  Continue with Google
                </button>

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

                {/* enter otp input */}
                <div className="inputGroup">
                  <label>Enter OTP</label>
                  <input
                    type="text"
                    placeholder="Enter 6 digit OTP"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                  />
                </div>

                {/* verify otp button */}
                <button className="btn btnPrimary" type="submit">
                  Verify OTP
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
                  Didn't receive OTP?
                  <span> Resend OTP </span>
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


