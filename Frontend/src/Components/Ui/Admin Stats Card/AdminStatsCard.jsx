import './AdminStatsCard.css'

const AdminStatsCard = (props) => {

    const {
        icon,
        title,
        value,
        variant
    } = props;

    return (

        <div className={`admin-stats-card ${variant}`}>

            {/* Icon */}
            <div className="stats-card-icon">
                {icon}
            </div>

            {/* Info */}
            <div className="stats-card-info">

                <span className="stats-card-title">
                    {title} - 
                </span>

                <span className="stats-card-value">
                    {value}
                </span>

            </div>

        </div>

    )

}

export default AdminStatsCard;