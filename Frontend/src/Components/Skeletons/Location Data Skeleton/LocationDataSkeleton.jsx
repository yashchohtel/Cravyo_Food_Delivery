import './LocationDataSkeleton.css'

const LocationDataSkeleton = () => {

    return (

        <>
            <div className="locationLoadingCard">

                <div className="locationLoadingTitleRow">
                    <div className="locationLoadingIcon locationLoadingShimmer"></div>
                    <div className="locationLoadingTitle locationLoadingShimmer"></div>
                </div>

                <div className="locationLoadingAddress">
                    <div className="locationLoadingLine locationLoadingShimmer"></div>
                    <div className="locationLoadingLine locationLoadingShimmer"></div>
                </div>

            </div>
        </>

    )

}

export default LocationDataSkeleton