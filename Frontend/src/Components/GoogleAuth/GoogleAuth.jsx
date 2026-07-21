import { auth } from '../../firebase/firebase.js';
import './GoogleAuth.css'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const GoogleAuth = () => {

    // function to handle google authentication
    const handleGoogleAuth = async () => {

        try {

            // Creatign a google auth provider instance
            const provider = new GoogleAuthProvider();

            // to show popup
            const result = await signInWithPopup(auth, provider)

            // get goken id from the result
            const idToken = await result.user.getIdToken();

            console.log(idToken);

        } catch (err) {

            console.log(err);

        }

    }

    return (
        <>
            {/* continue with google button */}
            <button
                className="btn btnGoogle"
                type="button"
                onClick={() => handleGoogleAuth()}
            >
                <img src="/googleLogo.png" alt="Google" />
                Continue with Google
            </button>

        </>
    )
}


export default GoogleAuth