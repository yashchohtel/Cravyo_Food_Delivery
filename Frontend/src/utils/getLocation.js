export const handleGetLocation = () => {

    if (!navigator.geolocation) {
        alert("Geolocation is not supported.");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        // Success
        (position) => {
            console.log("Latitude:", position.coords.latitude);
            console.log("Longitude:", position.coords.longitude);
        },

        // Error
        (error) => {
            console.log(error);

            switch (error.code) {

                case error.PERMISSION_DENIED:
                    alert("Location permission denied.");
                    break;

                case error.POSITION_UNAVAILABLE:
                    alert("Turn on your device location.");
                    break;

                case error.TIMEOUT:
                    alert("Location request timed out.");
                    break;

                default:
                    alert("Something went wrong.");
            }

        }

    );


    

};