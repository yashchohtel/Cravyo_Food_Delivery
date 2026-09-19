import './RestaurantOwnerFormModal.css'

const RestaurantOwnerFormModal = (props) => {

    // destructure console
    const {
        isOpen,
        type,
        mode,
        data,
        onClose
    } = props

    // if modal closed
    if (!isOpen) {
        return null;
    }

    return (

        <>
            <div className="restaurantOwner-modal-overlay">

                <div className="admin-modal">

                </div>

            </div>
        </>

    )

}

export default RestaurantOwnerFormModal