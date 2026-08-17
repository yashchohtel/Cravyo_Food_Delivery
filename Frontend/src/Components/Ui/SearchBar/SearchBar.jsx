import './SearchBar.css'
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const SearchBar = (props) => {

    // destructure props
    const { value, onChange, onClear, readOnly, onClick } = props;

    return (

        <>
            <div
                className="locationSearchBar"
                onClick={onClick}
            >

                <input
                    type="text"
                    placeholder="Search an area or address"
                    value={value}
                    onChange={onChange}
                    readOnly={readOnly}
                />

                {value?.trim() ? (
                    <button
                        className="searchBtn"
                        onClick={onClear}
                    >
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