import './LocationDataSkeleton.css'

const LocationDataSkeleton = () => {

    return (
        
        <>
            <div className="locationLoadingCard">

                <div className="locationTitleRow">
                    <div className="skeletonIcon shimmer"></div>
                    <div className="skeletonTitle shimmer"></div>
                </div>

                <div className="skeletonAddress">
                    <div className="skeletonLine shimmer"></div>
                    <div className="skeletonLine shimmer"></div>
                </div>

                {/* <div className="skeletonButton shimmer"></div> */}

            </div>
        </>

    )

}

export default LocationDataSkeleton