import { Link } from "react-router-dom";
import "./DeliveryBoy.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAvailableAssignments } from "../../features/delivery Assignment/deliveryAssignmentThunk";

const DeliveryBoy = () => {

    const dispatch = useDispatch();

    // getting data form store
    const { assignments, assignmentsLoading, errorMessage } = useSelector((state) => state.deliveryAssignment);

    // Fetch available delivery assignments
    useEffect(() => {
        dispatch(getAvailableAssignments());
    }, [dispatch]);

    // Log available assignments
    useEffect(() => {
        console.log(assignments);
    }, [assignments]);

    return (
        
        <>
            <h1>DELIVERY BOY</h1>

            <br /><br />

            <p>
                {assignmentsLoading
                    ? "Loading assignments..."
                    : `Total Assignments: ${assignments.length}`}
            </p>

            {errorMessage && <p>{errorMessage}</p>}

            <Link to="/home">Home Page</Link>
        </>
    );
};

export default DeliveryBoy;