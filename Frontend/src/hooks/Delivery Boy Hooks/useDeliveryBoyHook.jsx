import { useDispatch, useSelector } from "react-redux";
import { updateDeliveryBoyStatus } from "../../features/user/userThunk";

const useDeliveryBoy = () => {

    const dispatch = useDispatch();

    // Get delivery boy status and loading state
    const {
        isDeliveryBoyActive,
        deliveryBoyStatusLoading,
        errorMessage,
        successMessage
    } = useSelector((state) => state.user);

    // Handle online/offline status
    const handleStatusChange = async () => {

        if (deliveryBoyStatusLoading) return;

        try {

            await dispatch(
                updateDeliveryBoyStatus({ isDeliveryBoyActive: !isDeliveryBoyActive })
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
        handleStatusChange
    };
};

export default useDeliveryBoy;
