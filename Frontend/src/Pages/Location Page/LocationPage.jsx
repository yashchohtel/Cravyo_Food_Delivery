import './LocationPage.css'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../Components/Ui/SearchBar/SearchBar';
import { FaArrowLeft } from "react-icons/fa6";
import { BiTargetLock } from "react-icons/bi"; import { MdOutlineAddBox } from "react-icons/md";
import { recentSearches, savedAddresses } from '../../utils/dummyData';
import LocationCard from '../../Components/Ui/LocationCard/LocationCard';

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

                {/* Location cards - saved adress */}
                {savedAddresses.length > 0 && (

                    <>

                        {/* saved adddress heading */}
                        <h3 className="sectionHeading">SAVED ADDRESSES</h3>

                        {savedAddresses.map((address) => (

                            // location card component for each saved address
                            <LocationCard
                                key={address.id}
                                data={address}
                                type="saved"
                            />

                        ))}

                    </>

                )}

                {/* Location cards - recent searches */}
                {recentSearches.length > 0 && (

                    <>
                        {/* Recent searches heading */}
                        <h3 className="sectionHeading">RECENT SEARCHES</h3>

                        {recentSearches.map((search) => (
                            <LocationCard
                                key={search.id}
                                data={search}
                                type="recent"
                            />
                        ))}

                    </>
                    
                )}

            </div>

        </>

    )

}

export default LocationPage