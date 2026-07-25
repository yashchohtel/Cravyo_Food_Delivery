import { Link } from 'react-router-dom'
import './RestaurantOwner.css'
import { useSelector } from 'react-redux';

const RestaurantOwner = () => {

    const { user } = useSelector((state) => state.auth);

    return (

        <>
            <h1>RESTAURANT OWNER</h1> <br /> <br />
            <br /><br />

            <Link to="/home">Home Page</Link>

            <br /><br />

            {user?.roles?.includes("restaurantOwner") && (
                <>
                    <Link to="/restaurant">Restaurant Owner Dashboard</Link>
                    <br /><br />
                </>
            )}

            {user?.roles?.includes("deliveryBoy") && (
                <>
                    <Link to="/delivery">Delivery Boy Dashboard</Link>
                    <br /><br />
                </>
            )}
        </>

    )

}
export default RestaurantOwner