import './NavbarBottom.css'
import { FiSearch } from "react-icons/fi";

const NavbarBottom = (props) => {

  // destructure props
  const {
    userFoodPreference,  // user's current Food Preference
    setUserFoodPreference,   // update food preference
    setIsFoodDialogOpen, // to set food prefrence dialog open close state
  } = props;

  /* -------------------------------------- */

  // Handle veg mode button click
  const handleDialogClick = () => {

    // If already in veg mode, switch back to all directly
    if (userFoodPreference === "veg") {

      setUserFoodPreference("all");

      localStorage.setItem(
        "userFoodPreference",
        JSON.stringify("all")
      );

      return;
    }

    // Otherwise open the food preference dialog
    setIsFoodDialogOpen(true);

  };

  return (

    <>

      {/* navbar bottom */}
      <section className="navbar-bottom">

        {/* Search */}
        <div className="search-container">

          {/* Search Icon */}
          <span className="searchIcon">
            <FiSearch />
          </span>

          {/* search input */}
          <input
            type="text"
            placeholder="Search for food, restaurants..."
            className="search-input"
          />

        </div>

        {/* veg mode button */}
        <div
          className="veg-mode"
          onClick={() => handleDialogClick()} // open food prefrence
        >

          <span className="veg-title"> VEG </span>

          <div className={`veg-switch ${userFoodPreference === "veg" ? "active" : ""}`}>
            <div className="veg-thumb"></div>
          </div>

        </div>

      </section>

    </>

  )

}

export default NavbarBottom;