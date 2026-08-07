import './LocationCard.css'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GrLocationPin } from "react-icons/gr";
import { IoMdTime } from "react-icons/io";
import { MdOutlineEditLocation } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";


const LocationCard = (props) => {

    // destructure props
    const {
        data,
        type,
        openMenuId,
        setOpenMenuId,
    } = props;

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

    return (

        <>
            <div className="addressCard">

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
                            onClick={() => handleMenuToggle(data.id)}
                        >
                            <HiOutlineDotsVertical />
                        </button>

                        {openMenuId === data.id && (

                            <div className="addressDropdown">

                                <button className="editBtn"
                                    onClick={() => handleMenuToggle(data.id)}
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