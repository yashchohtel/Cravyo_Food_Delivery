import "./Spladh.css";

const Splash = () => {
    return (
        <div className="splash container">

            <img src="/logosmall.png" alt="Cravyo Logo" className="logo" />

            <div className="dots-loader">
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>
    );
};

export default Splash;