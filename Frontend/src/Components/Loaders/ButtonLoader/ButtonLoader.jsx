import "./ButtonLoader.css";

const ButtonLoader = ({ color = "#fff" }) => {
    return (
        <div
            className="buttonLoader"
            style={{ "--loader-color": color }}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default ButtonLoader;