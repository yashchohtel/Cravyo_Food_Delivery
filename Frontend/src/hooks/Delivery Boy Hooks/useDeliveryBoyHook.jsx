
import { useDispatch, useSelector } from "react-redux";
import { updateDeliveryBoyStatus } from "../../features/user/userThunk";
import { acceptDeliveryAssignment } from "../../features/delivery Assignment/deliveryAssignmentThunk";
// import { acceptDeliveryAssignment } from "../../features/deliveryAssignment/deliveryAssignmentThunk";

const useDeliveryBoy = () => {

    const dispatch = useDispatch();

    // Get delivery boy status and loading state
    const {
        isDeliveryBoyActive,
        deliveryBoyStatusLoading,
        errorMessage,
        successMessage
    } = useSelector((state) => state.user);

    // Get delivery assignment state
    const {
        assignments,
        assignmentsLoading,
        acceptAssignmentLoading,
        errorMessage: assignmentErrorMessage,
        successMessage: assignmentSuccessMessage
    } = useSelector((state) => state.deliveryAssignment);

    // Handle online/offline status
    const handleStatusChange = async () => {

        if (deliveryBoyStatusLoading) return;

        try {

            await dispatch(
                updateDeliveryBoyStatus({
                    isDeliveryBoyActive: !isDeliveryBoyActive
                })
            ).unwrap();

        } catch (error) {

            console.log(error);

        }

    };

    // Handle delivery assignment acceptance
    const handleAcceptAssignment = async (assignmentId) => {

        if (acceptAssignmentLoading) return;

        try {

            await dispatch(
                acceptDeliveryAssignment(assignmentId)
            ).unwrap();

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
        handleAcceptAssignment
    };
};





export default useDeliveryBoy;
