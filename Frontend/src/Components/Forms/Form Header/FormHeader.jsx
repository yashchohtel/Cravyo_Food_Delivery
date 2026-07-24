const FormHeader = ({ currentForm }) => {

    return (
        <>
        
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
        </>
    )

}
export default FormHeader