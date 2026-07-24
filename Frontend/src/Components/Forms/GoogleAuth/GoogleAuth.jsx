import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../../firebase/firebase.js';
import './GoogleAuth.css'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { googleAuth } from '../../../features/auth/authThunk.js';
import ButtonLoader from '../../Loaders/ButtonLoader/ButtonLoader.jsx';

const GoogleAuth = ({ changeForm, formLoading, googleLoading, setGoogleLoading, clearTempSessionData }) => {

    // initialize use dispatch
    const dispatch = useDispatch();

    /* -------------------------------------- */

    // getting required data from global store using useSelector
    const { googleAuthLoading } = useSelector((state) => state.auth);

    /* -------------------------------------- */

    // function to handle google authentication
    const handleGoogleAuth = async () => {

        // clear error and form data
        changeForm()

        try {

            // set google button loading
            setGoogleLoading(true);

            // Creatign a google auth provider instance
            const provider = new GoogleAuthProvider();

            // to show popup
            const result = await signInWithPopup(auth, provider)

            // get goken id from the result
            const idToken = await result.user.getIdToken();

            // dispatch google auth 
            dispatch(googleAuth(idToken));

        } catch (err) {

            console.log(err);

        } finally {

            // set google loading false on api complition
            setGoogleLoading(false);

            // clear temperory sesstion data on login sucessfull
            clearTempSessionData()

        }

    }

    return (

        <>

            {/* continue with google button */}
            <button
                className="btn btnGoogle"
                type="button"
                onClick={handleGoogleAuth}
                disabled={googleLoading || googleAuthLoading || formLoading}
            >
                {googleLoading || googleAuthLoading ?
                    (<ButtonLoader color="var(--primary-color)" />)
                    :
                    (<>
                        <img src="/googleLogo.png" alt="Google" />
                        Continue with Google
                    </>)
                }
            </button>

        </>
    )
}


export default GoogleAuth