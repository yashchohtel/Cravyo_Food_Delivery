import './NavbarBottom.css'
import { FiSearch } from "react-icons/fi";

const NavbarBottom = (props) => {

  // destructure props
  const {
    userFoodPreference,  // user's current Food Preference
    setIsFoodDialogOpen, // to set food prefrence dialog open close state
  } = props;

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
          onClick={() => setIsFoodDialogOpen(true)} // open food prefrence
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