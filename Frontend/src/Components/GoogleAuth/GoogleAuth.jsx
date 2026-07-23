import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase/firebase.js';
import './GoogleAuth.css'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { googleAuth } from '../../features/auth/authThunk.js';
import ButtonLoader from '../Loaders/ButtonLoader/ButtonLoader.jsx';
import { useState } from 'react';

const GoogleAuth = ({ changeForm }) => {

    // initialize use dispatch
    const dispatch = useDispatch();

    /* -------------------------------------- */

    // getting required data from global store using useSelector
    const { googleAuthLoading } = useSelector((state) => state.auth);

    /* -------------------------------------- */

    // state to handle google loading
    const [googleLoading, setGoogleLoading] = useState(false);

    /* -------------------------------------- */

    // function to handle google authentication
    const handleGoogleAuth = async () => {

        // clear all errors and state message
        // changeForm()

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

        }

    }

    return (

        <>

            {/* continue with google button */}
            <button
                className="btn btnGoogle"
                type="button"
                onClick={handleGoogleAuth}
                disabled={googleLoading || googleAuthLoading}
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