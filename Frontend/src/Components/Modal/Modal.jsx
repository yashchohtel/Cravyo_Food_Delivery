import './Modal.css'

const Modal = (props) => {

    const {
        isOpen,      // modal visibility
        onClose,     // close modal
        children,    // dialog content
    } = props;


    if (!isOpen) return null;

    return (

        <>
            {/* dialog modal */}
            <div className="modal">

                {/* modal overlay */}
                <div
                    className="overlay"
                    onClick={onClose}
                ></div>

                {/* dialog box container */}
                <div className="dialog">

                    {children}

                </div>

            </div>
        </>

    )
}

export default Modal