import './LocationCardSkeleton.css'

const LocationCardSkeleton = () => {

    return (

        <>
            <div className="locationCardSkeleton">

                <div className="skeletonIcon shimmer"></div>

                <div className="skeletonContent">

                    <div className="skeletonTitle shimmer"></div>

                    <div className="skeletonLine shimmer"></div>

                    <div className="skeletonLine short shimmer"></div>

                </div>

            </div>
        </>

    )

}

export default LocationCardSkeleton