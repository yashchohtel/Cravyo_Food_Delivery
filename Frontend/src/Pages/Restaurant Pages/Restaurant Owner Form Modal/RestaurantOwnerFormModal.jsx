import EditRestaurantForm from '../../../Components/Forms/Edit Restaurant Form/EditRestaurantForm';
import AddFoodItemForm from '../Add Food Item Form/AddFoodItemForm';
import './RestaurantOwnerFormModal.css'

const RestaurantOwnerFormModal = (props) => {

    // destructure console
    const { isOpen, onClose, type, mode, data, } = props

    // if modal closed
    if (!isOpen) {
        return null;
    }

    return (

        <>
            <div className="restaurantOwner-modal-overlay">

                {/* if form is edit restaurant form */}
                {type === "editRestaurant" && mode === "edit" && (
                    <EditRestaurantForm
                        onClose={onClose}
                        data={data}
                    />
                )}

                {/* if type is not equal to exit restaurant */}
                {type === "addFoodItem" && (
                    <AddFoodItemForm
                        onClose={onClose}
                        mode={mode}
                        data={data}
                    />
                )}

            </div>
        </>

    )

}

export default RestaurantOwnerFormModal