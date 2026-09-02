import './AdminFormModal.css'

const AdminFormModal = (props) => {

    // destructure props
    const { isOpen, onClose } = props;

    // if modal is not open, return null
    if (!isOpen) return null;

    // handle overlay click to close modal
    const handleOverlayClick = (e) => {

        if (e.target === e.currentTarget) {
            onClose();
        }

    };

    return (

        <div
            className="admin-modal-overlay"
            onClick={handleOverlayClick}
        >

            <div className="admin-modal">

            </div>

        </div>

    );

}

export default AdminFormModal;