import './FoodPreferenceDialog.css'

const FoodPreferenceDialog = () => {

    return (

        <>
            <div className="food-dialog">

                <div className="food-dialog-header">

                    <div>
                        <h2>I want to see veg choices from</h2>
                    </div>

                    <button className="close-btn">
                        ✕
                    </button>

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