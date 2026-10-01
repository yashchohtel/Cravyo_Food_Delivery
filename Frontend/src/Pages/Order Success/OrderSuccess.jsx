import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        const orderJustPlaced = sessionStorage.getItem("orderJustPlaced");

        if (!orderJustPlaced) {
            navigate("/", { replace: true });
            return;
        }

        sessionStorage.removeItem("orderJustPlaced");
    }, [navigate]);

    return (
        <main className="orderSuccess">

            {/* Confetti */}
            <div className="orderSuccessConfetti">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="orderSuccessCard">

                {/* Success Icon */}
                <div className="orderSuccessIcon">
                    <div className="orderSuccessCheck">
                        ✓
                    </div>
                </div>

                {/* Cartoon */}
                <div className="orderSuccessImageWrapper">
                    <div className="orderSuccessGlow"></div>

                    <img
                        src="/succesOrder.png"
                        alt="Order successful"
                        className="orderSuccessImage"
                    />
                </div>

                {/* Content */}
                <div className="orderSuccessContent">

                    <p className="orderSuccessSmallText">
                        ORDER PLACED
                    </p>

                    <h1>
                        Order Successful!
                    </h1>

                    <p className="orderSuccessMessage">
                        Yay! Your order has been placed successfully.
                        Sit back, relax and we'll take care of the rest.
                    </p>

                </div>

                {/* Buttons */}
                <div className="orderSuccessActions">

                    <button
                        className="orderSuccessOrdersButton"
                        onClick={() => navigate("/my-order")}
                    >
                        Your Orders
                    </button>

                    <button
                        className="orderSuccessHomeButton"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </button>

                </div>

            </div>

        </main>
    );
};

export default OrderSuccess;