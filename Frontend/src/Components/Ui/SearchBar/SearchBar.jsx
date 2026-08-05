import './SearchBar.css'
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {

    return (

        <>
            <div className="locationSearchBar">

                <input
                    type="text"
                    placeholder="Search an area or address"
                />

                <button className="searchBtn">
                    <FiSearch />
                </button>

            </div>
        </>

    )

}

export default SearchBar;