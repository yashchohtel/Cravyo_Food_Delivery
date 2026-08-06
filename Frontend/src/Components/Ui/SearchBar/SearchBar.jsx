import './SearchBar.css'
import { FiSearch } from "react-icons/fi";

const SearchBar = (props) => {

    // destructure props
    const { value, onChange } = props;

    return (

        <>
            <div className="locationSearchBar">

                <input
                    type="text"
                    placeholder="Search an area or address"
                    value={value}
                    onChange={onChange}
                />

                <button className="searchBtn">
                    <FiSearch />
                </button>

            </div>
        </>

    )

}

export default SearchBar;