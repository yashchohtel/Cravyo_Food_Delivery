import './LocationPage.css'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../Components/Ui/SearchBar/SearchBar';
import { FaArrowLeft } from "react-icons/fa6";
import { BiTargetLock } from "react-icons/bi"; import { MdOutlineAddBox } from "react-icons/md";

const LocationPage = () => {

    // useNavigate hook to navigate to previous page
    const navigate = useNavigate();

    return (

        <>

            {/* location page */}
            <div className="locationPage container">

                {/* location page header */}
                <div className="locationHeader">

                    <FaArrowLeft
                        className="backIcon"
                        onClick={() => navigate(-1)}
                    />

                    <h2>Select Your Location</h2>

                </div>

                {/* search bar */}
                <SearchBar />

                {/* locaiton actions */}
                <div className="locationActions">

                    <button className="locationAction">
                        <BiTargetLock />
                        <p>Use Current Location</p>
                    </button>

                    <button className="locationAction">
                        <MdOutlineAddBox />
                        <p>Add New Address</p>
                    </button>
                    
                </div>

            </div>

        </>

    )

}

export default LocationPage