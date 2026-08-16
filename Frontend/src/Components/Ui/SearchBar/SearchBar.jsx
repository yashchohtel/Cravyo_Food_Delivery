import './SearchBar.css'
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

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

                {value?.trim() ? (
                    <button className="searchBtn">
                        <IoClose />
                    </button>
                ) : (
                    <button className="searchBtn">
                        <FiSearch />
                    </button>
                )}

            </div>
        </>

    )

}

export default SearchBar;