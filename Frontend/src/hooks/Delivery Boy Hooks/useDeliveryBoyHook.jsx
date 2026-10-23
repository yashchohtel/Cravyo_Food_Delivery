
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

    // initilize use dispatch
    const dispatch = useDispatch();

    // Get delivery boy status and loading state
    const { isDeliveryBoyActive, deliveryBoyStatusLoading, errorMessage, successMessage } = useSelector((state) => state.user);

    // Get delivery assignment state
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

    // Handle online/offline status
    const handleStatusChange = async () => {

        if (deliveryBoyStatusLoading) return;

        try {

            await dispatch(updateDeliveryBoyStatus({ isDeliveryBoyActive: !isDeliveryBoyActive })).unwrap();

        } catch (error) {

            console.log(error);

        }

    };

    // Handle delivery assignment acceptance
    const handleAcceptAssignment = async (assignmentId) => {

        if (acceptAssignmentLoading) return;

        try {

            // dispatch accpet delivery assignment
            await dispatch(acceptDeliveryAssignment(assignmentId)).unwrap();

        } catch (error) {

            console.log(error);

        }

    };

    // Handle fetching delivery assignment details
    const handleGetDeliveryAssignment = async (assignmentId) => {

        try {

            await dispatch(getDeliveryAssignmentById(assignmentId)).unwrap();

        } catch (error) {

            console.log(error);

        }

    };

    // Handle marking order as picked up
    const handleMarkOrderPickedUp = async (assignmentId) => {

        if (markOrderPickedUpLoading) return;

        try {

            await dispatch(markOrderPickedUp(assignmentId)).unwrap();

        } catch (error) {

            console.log(error);

        }

    };

    // Handle marking order as delivered
    const handleMarkOrderDelivered = async (assignmentId) => {

        if (markOrderDeliveredLoading) return;

        try {

            await dispatch(markOrderDelivered(assignmentId)).unwrap();

        } catch (error) {

            console.log(error);

        }

    };

    // Handle cancelling delivery order
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
