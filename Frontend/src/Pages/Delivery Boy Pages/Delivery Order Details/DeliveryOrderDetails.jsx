import { useEffect } from "react";
import useDeliveryBoy from "../../../hooks/Delivery Boy Hooks/useDeliveryBoyHook.jsx";
import { useParams } from "react-router-dom";

const DeliveryOrderDetails = () => {

  // get assignemtn id form params
  const { assignmentId } = useParams();

  // get state and function from hook
  const {
    handleGetDeliveryAssignment,
    selectedAssignment,
  } = useDeliveryBoy();

  // get assignment
  useEffect(() => {
    if (assignmentId) {
      handleGetDeliveryAssignment(assignmentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentId]);

  console.log(selectedAssignment);

  return (

    <>
      DeliveryOrderDetails
    </>

  )

}

export default DeliveryOrderDetails
