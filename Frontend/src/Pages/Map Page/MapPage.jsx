import { useLocation } from 'react-router-dom';
import './MapPage.css';

const MapPage = () => {

    // initilize use location
    const location = useLocation();

    console.log(location.state?.location);
    console.log(location.state?.mode);

    

    return (

        <>
            MapPage
        </>

    )

}

export default MapPage;

