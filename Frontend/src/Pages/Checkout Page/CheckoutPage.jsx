import { IoAdd, IoArrowBack } from 'react-icons/io5';
import './CheckoutPage.css'
import { useNavigate } from 'react-router-dom';
import useCheckoutHook from '../../hooks/Order Placing Hooks/useCheckoutHook';
import AddAddressModal from '../Add Adress Page/AddAddressModal';

const CheckoutPage = () => {

    const navigate = useNavigate();

    const {
        isAddressModalOpen,
        openAddressModal,
        closeAddressModal
    } = useCheckoutHook();

    return (

        <>

            {/* Add Address Modal */}
            <AddAddressModal
                isAddressModalOpen={isAddressModalOpen}
                closeAddressModal={closeAddressModal}
            />

            <div className="checkoutPage container">

                {/* header */}
                <div className="checkoutPage__header">

                    <button
                        className="checkoutPage__backButton"
                        onClick={() => navigate(-1)}
                    >
                        <IoArrowBack />
                    </button>

                    <h1>
                        Checkout
                    </h1>

                </div>

                {/* address card */}
                <div
                    className="checkoutPage__addAddressCard"
                    onClick={openAddressModal}
                >

                    <div className="checkoutPage__addAddressIcon">
                        <IoAdd />
                    </div>

                    <div className="checkoutPage__addAddressContent">
                        <h3>Add Address</h3>

                        <p>
                            Select on map or enter manually
                        </p>
                    </div>

                </div>

            </div>
        </>

    )

}

export default CheckoutPage;