import { useState } from "react";

const Auth = () => {

  // state to toggle between register and login and login forms
  const [currentForm, setCurrentForm] = useState("login"); // Possible values: "login", "signup", "otp", "verifyOtp"

  return (
    <>

      {/* authpage */}
      <div className="authPage">

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
          <div className="authForm">

            {/* login form */}
            {currentForm === "login" && (

              <>
                {/* identifiers */}
                <div className="inputGroup">
                  <label>Email or Mobile</label>
                  <input type="text" placeholder="Enter email or mobile" />
                </div>

                {/* login password */}
                <div className="inputGroup">
                  <label>Password</label>
                  <input type="password" placeholder="Enter password"/>
                </div>

                {/* login button */}
                <button className="primaryBtn">
                  Login
                </button>

                <button className="googleBtn" type="button" >
                  <img src="/google.png" alt="Google" />
                  Continue with Google
                </button>

                <p
                  className="otpLoginText"
                  onClick={() => setCurrentForm("otp")}
                >
                  Login with OTP
                </p>

                <p className="bottomText">
                  Don't have an account?
                  <span onClick={() => setCurrentForm("signup")}>
                    Sign Up
                  </span>
                </p>
              </>
            )}

          </div>
   
        </div>

      </div>

    </>
  );
}
export default Auth