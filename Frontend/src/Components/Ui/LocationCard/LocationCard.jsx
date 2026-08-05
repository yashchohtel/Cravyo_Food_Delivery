import './LocationCard.css'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GrLocationPin } from "react-icons/gr";
import { IoMdTime } from "react-icons/io";

const LocationCard = ({ data, type }) => {

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
                    {type === "saved" ? addressIcons[data.type] : <IoMdTime />}
                </div>

                <div className="addressContent">
                    <div className="addressTop">
                        <h3>{data.label}</h3>

                        {data.selected && <span>SELECTED</span>}
                    </div>

                    <p>{data.address}</p>
                    
                </div>

                {type === "saved" && (

                    <>

                        <button className="addressMenu">
                            <HiOutlineDotsVertical />
                        </button>

                        <div className="addressDropdown">
                            <button>Edit</button>
                            <button className="deleteBtn">Delete</button>
                        </div>

                    </>

                )}

            </div>

        </>

    )

}

export default LocationCard;