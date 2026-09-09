import { FiX } from "react-icons/fi";
import "./AdminFormModal.css";
import AdminBannerForm from "../../Forms/Admin Banner Form/AdminBannerForm.jsx";

const AdminFormModal = (props) => {

    // destructure props
    const { isOpen, onClose, type, mode, data } = props;

    /* -------------------------------------- */

    // modal title
    const getModalTitle = () => {

        if (type === "banner" && mode === "add") {
            return "Add New Banner";
        }

        if (type === "banner" && mode === "edit") {
            return "Edit Banner";
        }

        if (type === "banner" && mode === "view") {
            return "View Banner";
        }

        if (type === "banner" && mode === "delete") {
            return "Delete Banner";
        }

        return "";
    };

    /* -------------------------------------- */

    // if modal closed
    if (!isOpen) {
        return null;
    }

    return (

        <div className="admin-modal-overlay">

            <div className="admin-modal">

                {/* Header */}
                <div className="admin-modal-header">

                    <h2>
                        {getModalTitle()}
                    </h2>

                    <button
                        type="button"
                        className="admin-modal-close"
                        onClick={onClose}
                    >
                        <FiX />
                    </button>

                </div>

                {/* Banner Forms */}
                {type === "banner" && (

                    <AdminBannerForm
                        mode={mode}
                        data={data}
                        onClose={onClose}
                    />

                )}


            </div>

        </div>

    );
};


export default AdminFormModal;