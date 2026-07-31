import { useState } from 'react';
import './FoodPreferenceDialog.css'
import { IoClose } from "react-icons/io5";

const FoodPreferenceDialog = (props) => {

    // destructure props
    const {
        onClose, // to set food prefrence dialog open close state
        setUserFoodPreference, // to set user food prefrence all / veg only
    } = props;

    /* -------------------------------------- */

    // state to store user selected prefrence
    const [selectedPreference, setSelectedPreference] = useState("all");

    /* -------------------------------------- */

    // function to handle apply function
    const handleApply = () => {

        setUserFoodPreference(selectedPreference);

        localStorage.setItem(
            "userFoodPreference",
            JSON.stringify(selectedPreference)
        );

        onClose();
    };

    return (

        <>
            {/* food dialog box */}
            <div className="food-dialog">

                {/* close dialog box button */}
                <button
                    className="close-btn"
                    onClick={onClose}
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
                            checked={selectedPreference === "all"}
                            onChange={(e) => setSelectedPreference(e.target.value)}
                        />

                    </label>

                    <label className="food-option">

                        <span>Pure veg restaurants only</span>

                        <input
                            type="radio"
                            name="foodPreference"
                            value="veg"
                            checked={selectedPreference === "veg"}
                            onChange={(e) => setSelectedPreference(e.target.value)}
                        />

                    </label>

                </div>

                <div className="remember-choice">
                    <span>Remember my choice going forward</span>
                    <input type="checkbox" />
                </div>

                <button
                    className="apply-btn"
                    onClick={handleApply}
                >
                    Show restaurants
                </button>

            </div>
        </>

    )

}
export default FoodPreferenceDialog