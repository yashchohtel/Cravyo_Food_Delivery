import { useDispatch, useSelector } from 'react-redux';
import './MyOrders.css'
import { useEffect } from 'react';
import { getMyOrders } from '../../features/order/orderThunk';

const MyOrders = () => {

    // Initialize dispatch function from Redux
    const dispatch = useDispatch();

    // Accessing the orders and loading state from the Redux store
    const { orders, ordersLoading } = useSelector((state) => state.order);

    console.log(ordersLoading);
    console.log(orders);

    // Fetch user's orders when the component mounts
    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch]);

    return (

        <>
            MyOrders
        </>

    )

}

export default MyOrders