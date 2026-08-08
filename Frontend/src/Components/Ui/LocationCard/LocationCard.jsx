import './LocationCard.css'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GrLocationPin } from "react-icons/gr";
import { IoMdTime } from "react-icons/io";
import { MdOutlineEditLocation } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const LocationCard = (props) => {

    // destructure props
    const {
        data,
        type,
        openMenuId,
        setOpenMenuId,
        setRecentSearches,
    } = props;

    /* -------------------------------------- */

    // useNavigate hook to navigate to previous page
    const navigate = useNavigate();

    /* -------------------------------------- */

    // function to handle the click event on the address menu button
    const handleMenuToggle = (id) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    // adress icon based on the label of the address
    const addressIcons = {
        home: <IoHomeOutline />,
        work: <HiOutlineOfficeBuilding />,
        other: <GrLocationPin />,
    };

    /* -------------------------------------- */

    // Save the selected location to recent searches
    const saveRecentSearch = () => {

        // get recent searches data from local storage
        const recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

        const updatedSearches = [
            data,
            ...recentSearches.filter((item) => item.id !== data.id)
        ].slice(0, 5);

        // save to local storage
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

        // update recent searches
        setRecentSearches(updatedSearches);

    };

    /* -------------------------------------- */

    // function to handle card click
    const handleCardClick = () => {

        // if card type is saved navigate to home page
        if (type === "saved") {
            navigate("/");
            return;
        }

        // Search result → save to recent searches → navigate to map
        if (type === "search") {

            // saved recent search data to local storage
            saveRecentSearch();

            navigate("/map", {
                state: { location: data }
            });

            return;
        }

        // Recent search → directly navigate to map
        if (type === "recent") {

            navigate("/map", {
                state: { location: data }
            });

            return;
        }

    };

    return (

        <>
            <div
                className="addressCard"
                onClick={handleCardClick}
            >

                <div className="addressIcon">
                    {type === "saved" && addressIcons[data.addressType]}
                    {type === "recent" && <IoMdTime />}
                    {type === "search" && <IoLocationOutline />}
                </div>

                <div className="addressContent">

                    <div className="addressTop">
                        <h3>{data.title}</h3>
                        {data.selected && <span>SELECTED</span>}
                    </div>

                    <p>{data.address}</p>

                </div>

                {type === "saved" && (

                    <>

                        <button
                            className="addressMenu"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleMenuToggle(data.id);
                            }}
                        >
                            <HiOutlineDotsVertical />
                        </button>

                        {openMenuId === data.id && (

                            <div className="addressDropdown">

                                <button
                                    className="editBtn"
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        // navigate to map page with data
                                        navigate("/map", { state: { location: data, mode: "edit" } });

                                    }}
                                >
                                    <MdOutlineEditLocation />
                                    <span>Edit</span>
                                </button>

                                <button className="deleteBtn"
                                    onClick={() => handleMenuToggle(data.id)}
                                >
                                    <RiDeleteBin6Line />
                                    <span>Delete</span>
                                </button>

                            </div>

                        )}

                    </>

                )}

            </div>

        </>

    )

}

export default LocationCard;