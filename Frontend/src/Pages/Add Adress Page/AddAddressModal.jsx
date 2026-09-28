import { IoArrowBack } from "react-icons/io5";
import "./AddAddressModal.css";
import CreateRestaurantMap from "../../Components/Ui/Create Restaurant Map/CreateRestaurantMap";

const AddAddressModal = ({
    isAddressModalOpen,
    closeAddressModal
}) => {

    if (!isAddressModalOpen) return null;

    return (

        <div className="addAddressModal container">

            <div className="addAddressModal__header">

                <button
                    className="addAddressModal__backButton"
                    onClick={closeAddressModal}
                >
                    <IoArrowBack />
                </button>

                <h2>
                    Add Address
                </h2>

            </div>

            <div className="chckoutMapContainer">
                <CreateRestaurantMap />
            </div>

            <div className="addAddressModal__form">

                <h3 className="addAddressModal__formTitle">
                    Enter Address Details
                </h3>

                <div className="addAddressModal__inputGroup">

                    <label>
                        House / Flat / Building
                    </label>

                    <input
                        type="text"
                        placeholder="Enter house or flat number"
                    />

                </div>


                <div className="addAddressModal__inputGroup">

                    <label>
                        Area / Street
                    </label>

                    <input
                        type="text"
                        placeholder="Enter area or street"
                    />

                </div>


                <div className="addAddressModal__inputRow">

                    <div className="addAddressModal__inputGroup">

                        <label>
                            City
                        </label>

                        <input
                            type="text"
                            placeholder="City"
                        />

                    </div>


                    <div className="addAddressModal__inputGroup">

                        <label>
                            Pincode
                        </label>

                        <input
                            type="text"
                            placeholder="Pincode"
                        />

                    </div>

                </div>


                <button className="addAddressModal__saveButton">
                    Save Address
                </button>

            </div>

        </div>

    );
    
};

export default AddAddressModal;