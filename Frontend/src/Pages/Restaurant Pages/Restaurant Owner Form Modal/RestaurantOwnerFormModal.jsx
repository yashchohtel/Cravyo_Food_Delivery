import EditRestaurantForm from '../../../Components/Forms/Edit Restaurant Form/EditRestaurantForm';
import ButtonLoader from '../../../Components/Loaders/ButtonLoader/ButtonLoader';
import useAddFoodItem from '../../../hooks/Restaruant Owner Hooks/useFoodItems';
import AddFoodItemForm from '../Add Food Item Form/AddFoodItemForm';
import ViewFoodItem from '../View Food Item/ViewFoodItem';
import './RestaurantOwnerFormModal.css'

const RestaurantOwnerFormModal = (props) => {

    // destructure console
    const { isOpen, onClose, type, mode, data, } = props

    const {
        handleDeleteFoodItem,
        deleteFoodItemLoading
    } = useAddFoodItem({ onClose, mode, data });

    // if modal closed
    if (!isOpen) {
        return null;
    }

    return (

        <>
            <div className="restaurantOwner-modal-overlay">

                {/* if type is not equal to exit restaurant */}
                {type === "addFoodItem" && (
                    <AddFoodItemForm
                        onClose={onClose}
                        mode={mode}
                        data={data}
                    />
                )}

                {/* if form is edit restaurant form */}
                {type === "editRestaurant" && mode === "edit" && (
                    <EditRestaurantForm
                        onClose={onClose}
                        data={data}
                    />
                )}

                {/* if type is viewFoodItem  */}
                {type === "viewFoodItem" && mode === "view" && (
                    <ViewFoodItem
                        data={data}
                        onClose={onClose}
                    />
                )}

                {/* delete food item */}
                {type === "deleteFoodItem" && mode === "delete" && (

                    <div className="delete-food-modal">

                        {/* Header */}
                        <div className="delete-food-header">

                            <h2>Delete Food Item</h2>

                            <button
                                type="button"
                                className="delete-food-close"
                                onClick={onClose}
                            >
                                ×
                            </button>

                        </div>

                        <div className="delete-food-body">

                            <p>
                                Are you sure you want to delete this food item?
                            </p>

                            <div className="delete-food-actions">

                                <button
                                    type="button"
                                    className="delete-food-cancel"
                                    disabled={deleteFoodItemLoading}
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="delete-food-confirm"
                                    onClick={() => handleDeleteFoodItem(data._id)}
                                    disabled={deleteFoodItemLoading}
                                >
                                    {deleteFoodItemLoading ? <ButtonLoader /> : "Delete"}
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </div>
        </>

    )

}

export default RestaurantOwnerFormModal