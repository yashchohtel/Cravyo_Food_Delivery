import { FiX } from "react-icons/fi";
import "./AdminFormModal.css";
import AdminBannerForm from "../../Forms/Admin Banner Form/AdminBannerForm.jsx";
import AdminFoodCategoryForm from "../../Forms/Admin Food Category Form/AdminFoodCategoryForm.jsx";

const AdminFormModal = (props) => {

    // destructure props
    const {
        isOpen,
        type,
        mode,
        data,
        onClose,
    } = props;

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

        if (type === "category" && mode === "add") {
            return "Add New Category";
        }

        if (type === "category" && mode === "edit") {
            return "Edit Category";
        }

        if (type === "category" && mode === "view") {
            return "View Category";
        }

        if (type === "category" && mode === "delete") {
            return "Delete Category";
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

                {type === "category" && (
                    <AdminFoodCategoryForm
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