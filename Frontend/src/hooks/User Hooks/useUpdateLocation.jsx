import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserLocation } from "../../features/user/userThunk";

const useUpdateLocation = () => {

    // console.log("useUpdateLocation hook initialized");

    const dispatch = useDispatch();

    useEffect(() => {

        const watchId = navigator.geolocation.watchPosition(

            (position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Dispatch thunk to update user location in the backend
                dispatch(updateUserLocation({ latitude, longitude }));

            },

            (error) => {
                console.log("Location error:", error.message);
            }

        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };

    }, [dispatch]);

};

export default useUpdateLocation;