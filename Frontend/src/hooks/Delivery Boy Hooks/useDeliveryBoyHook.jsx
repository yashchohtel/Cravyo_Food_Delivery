import { useDispatch, useSelector } from "react-redux";
import { updateDeliveryBoyStatus } from "../../features/user/userThunk";
import { acceptDeliveryAssignment, getDeliveryAssignmentById } from "../../features/delivery Assignment/deliveryAssignmentThunk";

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
    };
};

export default useDeliveryBoy;
