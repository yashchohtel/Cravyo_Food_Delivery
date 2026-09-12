import { IoClose } from 'react-icons/io5';
import './AllCategoryPage.css'
import useFoodCategories from '../../hooks/useFoodCategories.jsx';

const AllCategoryPage = (props) => {

    // destructure props
    const { onClose, handleCategoryClick, selectedCategory } = props;

    // get elements of use food categoires hook
    const { allCategories } = useFoodCategories();

    return (

        <>
            <div
                className="allCategoriesOverlay"
                onClick={onClose}
            >

                <div
                    className="allCategoriesSheet"
                    onClick={(e) => e.stopPropagation()}
                >

                    <button
                        className="allCategoriesClose"
                        onClick={onClose}
                    >
                        <IoClose />
                    </button>

                    <div className="allCategoriesHeader">
                        <h2>Cuisines and dishes</h2>
                    </div>

                    <div className="allCategoriesContent">

                        <div className="allCategoriesGrid">

                            {allCategories.map((category) => (

                                <div
                                    className="allCategoryItem"
                                    key={category.name}
                                    onClick={() => (
                                        handleCategoryClick(category.id),
                                        onClose()
                                    )}
                                >

                                    <div
                                        className={`allCategoryImage ${selectedCategory === category.id ? "active" : ""}`}
                                    >
                                        <img src={category.image} alt={category.name} />
                                    </div>

                                    <p className={`${selectedCategory === category.id ? "active" : ""}`}>
                                        {category.name}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>
        </>

    )

}

export default AllCategoryPage;