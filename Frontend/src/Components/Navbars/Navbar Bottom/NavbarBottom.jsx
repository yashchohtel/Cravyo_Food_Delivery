import './NavbarBottom.css'

const NavbarBottom = () => {

  return (

    <>

      {/* navbar bottom */}
      <section className="navbar-bottom">

        {/* Search */}
        <div className="search-container">

          {/* Search Icon */}
          <input
            type="text"
            placeholder="Search for food, restaurants..."
            className="search-input"
          />

        </div>

        {/* Veg / Non Veg */}
        <div className="food-preference">

          <button className="active">
            Veg
          </button>
          
        </div>

      </section>

    </>

  )

}
export default NavbarBottom