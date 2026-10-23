import { useDispatch, useSelector } from "react-redux";
import { updateDeliveryBoyStatus } from "../../features/user/userThunk";
import {
    acceptDeliveryAssignment,
    getDeliveryAssignmentById,
    markOrderPickedUp,
    markOrderDelivered,
    cancelDeliveryOrder
} from "../../features/delivery Assignment/deliveryAssignmentThunk";

const useDeliveryBoy = () => {
    const dispatch = useDispatch();

    const {
        isDeliveryBoyActive,
        deliveryBoyStatusLoading,
        errorMessage,
        successMessage
    } = useSelector((state) => state.user);

    const {
        assignments,
        assignmentsLoading,
        acceptAssignmentLoading,
        selectedAssignment,
        assignmentDetailsLoading,
        markOrderPickedUpLoading,
        markOrderDeliveredLoading,
        cancelDeliveryOrderLoading,
        errorMessage: assignmentErrorMessage,
        successMessage: assignmentSuccessMessage
    } = useSelector((state) => state.deliveryAssignment);

    const handleStatusChange = async () => {
        if (deliveryBoyStatusLoading) return;

        try {
            await dispatch(updateDeliveryBoyStatus({
                isDeliveryBoyActive: !isDeliveryBoyActive
            })).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAcceptAssignment = async (assignmentId) => {
        if (acceptAssignmentLoading) return false;

        try {
            await dispatch(acceptDeliveryAssignment(assignmentId)).unwrap();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const handleGetDeliveryAssignment = async (assignmentId) => {
        try {
            await dispatch(getDeliveryAssignmentById(assignmentId)).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    const handleMarkOrderPickedUp = async (assignmentId) => {
        if (markOrderPickedUpLoading) return;

        try {
            await dispatch(markOrderPickedUp(assignmentId)).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    const handleMarkOrderDelivered = async (assignmentId) => {
        if (markOrderDeliveredLoading) return;

        try {
            await dispatch(markOrderDelivered(assignmentId)).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelDeliveryOrder = async (assignmentId) => {
        if (cancelDeliveryOrderLoading) return;

        try {
            await dispatch(cancelDeliveryOrder(assignmentId)).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    return {
        isDeliveryBoyActive,
        deliveryBoyStatusLoading,
        errorMessage,
        successMessage,
        handleStatusChange,

        assignments,
        assignmentsLoading,
        acceptAssignmentLoading,
        assignmentErrorMessage,
        assignmentSuccessMessage,
        handleAcceptAssignment,

        selectedAssignment,
        assignmentDetailsLoading,
        handleGetDeliveryAssignment,

        markOrderPickedUpLoading,
        handleMarkOrderPickedUp,

        markOrderDeliveredLoading,
        handleMarkOrderDelivered,

        cancelDeliveryOrderLoading,
        handleCancelDeliveryOrder
    };
};

export default useDeliveryBoy;
