import { IoArrowBack } from "react-icons/io5";
import "./AddAddressModal.css";
import CreateRestaurantMap from "../../Components/Ui/Create Restaurant Map/CreateRestaurantMap";

const AddAddressModal = (props) => {

    const {
        isAddressModalOpen,
        closeAddressModal,

        addressForm,
        handleAddressChange,
        handleMapLocation,
        handleSaveAddress
    } = props

    if (!isAddressModalOpen) return null;

    return (

        <div className="addAddressModal container">

            {/* header */}
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

            {/* map container */}
            <div className="chckoutMapContainer">

                <CreateRestaurantMap
                    latitude={Number(addressForm.latitude)}
                    longitude={Number(addressForm.longitude)}
                    handleMapLocation={handleMapLocation}
                    setInitialLocation={true}
                />

            </div>

            {/* address form */}
            <div className="addAddressModal__form">

                <h3 className="addAddressModal__formTitle">
                    Enter Address Details
                </h3>

                <div className="addAddressModal__inputGroup">

                    <label>
                        House / Flat / Building
                    </label>

                    <input
                        name="houseNumber"
                        value={addressForm.houseNumber}
                        onChange={handleAddressChange}
                        placeholder="Enter house or flat number"
                    />

                </div>

                <div className="addAddressModal__inputGroup">

                    <label>
                        Area / Street
                    </label>

                    <input
                        name="area"
                        value={addressForm.area}
                        onChange={handleAddressChange}
                        placeholder="Enter area or street"
                    />

                </div>

                <div className="addAddressModal__inputRow">

                    <div className="addAddressModal__inputGroup">

                        <label>
                            City
                        </label>

                        <input
                            name="city"
                            value={addressForm.city}
                            onChange={handleAddressChange}
                            placeholder="City"
                        />

                    </div>


                    <div className="addAddressModal__inputGroup">

                        <label>
                            Pincode
                        </label>

                        <input
                            name="pincode"
                            value={addressForm.pincode}
                            onChange={handleAddressChange}
                            placeholder="Pincode"
                        />

                    </div>

                </div>

                {(
                    !addressForm.latitude ||
                    !addressForm.longitude ||
                    !addressForm.houseNumber ||
                    !addressForm.area ||
                    !addressForm.city ||
                    !addressForm.pincode
                ) && (
                        <p className="addAddressModal__error">
                            Please fill all the fields
                        </p>
                    )}


                <button
                    className="addAddressModal__saveButton"
                    onClick={handleSaveAddress}
                >
                    Save Address
                </button>

            </div>

        </div>

    );

};

export default AddAddressModal;