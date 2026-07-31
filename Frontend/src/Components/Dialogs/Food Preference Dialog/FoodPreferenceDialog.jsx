import './FoodPreferenceDialog.css'
import { IoClose } from "react-icons/io5";

const FoodPreferenceDialog = ({ setIsFoodDialogOpen }) => {

    return (

        <>
            {/* food dialog box */}
            <div className="food-dialog">

                {/* close dialog box button */}
                <button
                    className="close-btn"
                    onClick={() => setIsFoodDialogOpen(false)}
                >

                    <IoClose />
                </button>

                <div className="food-dialog-header">

                    <div>
                        <h2>Choose Your Preference</h2>
                    </div>

                    <div className="vegImg">
                        <img src="/vegImg.png" alt="vegLogo" />
                    </div>

                </div>

                <div className="food-options">

                    <label className="food-option">

                        <span>All restaurants</span>

                        <input
                            type="radio"
                            name="foodPreference"
                            value="all"
                        />

                    </label>

                    <label className="food-option">

                        <span>Pure veg restaurants only</span>

                        <input
                            type="radio"
                            name="foodPreference"
                            value="veg"
                        />

                    </label>

                </div>

                <div className="remember-choice">

                    <span>Remember my choice going forward</span>

                    <input type="checkbox" />

                </div>

                <button className="apply-btn">
                    Show restaurants
                </button>

            </div>
        </>

    )

}
export default FoodPreferenceDialog