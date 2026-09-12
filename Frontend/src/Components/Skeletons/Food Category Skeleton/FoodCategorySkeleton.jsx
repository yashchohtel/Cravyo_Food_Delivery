import "./FoodCategorySkeleton.css";

const FoodCategorySkeleton = () => {
    return (
        <section className="topCategories container">
            <h2 className="topCategoriesTitle">
                Top Categories
            </h2>

            <div className="foodCategorySkeletonList">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div className="foodCategorySkeletonItem" key={index}>
                        <div className="foodCategorySkeletonImage shimmer"></div>
                        <div className="foodCategorySkeletonText shimmer"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FoodCategorySkeleton;