import './AdminRecentContentSkeleton.css'

const AdminRecentContentSkeleton = () => {

    return (

        <>
            <div className="recent-content-skeleton">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div className="recent-skeleton-row" key={index}>
                        <div className="recent-skeleton-image"></div>

                        <div className="recent-skeleton-info">
                            <div className="recent-skeleton-line recent-skeleton-name"></div>
                            <div className="recent-skeleton-line recent-skeleton-date"></div>
                        </div>

                        <div className="recent-skeleton-line recent-skeleton-small"></div>
                        <div className="recent-skeleton-line recent-skeleton-status"></div>
                    </div>
                ))}
            </div>
        </>

    )

}

export default AdminRecentContentSkeleton