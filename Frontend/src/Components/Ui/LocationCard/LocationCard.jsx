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

    // function to handle card click
    const handleCardClick = () => {

        // Saved / recent → home
        if (type === "saved" || type === "recent") {
            navigate("/home");
            return;
        }

        // Search result → map
        if (type === "search") {
            navigate("/map", {
                state: { location: data }
            });
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
                        <h3>{data.addressTitle}</h3>
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