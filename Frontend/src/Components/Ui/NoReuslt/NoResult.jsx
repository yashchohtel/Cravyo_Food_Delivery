import './NoResult.css';

const NoResult = () => {

    return (

        <>
            <div className="noResult">

                <img src="/noresult.png" alt="No Result" />

                <p>Uh, oh! We couldn't find this location</p>

                <h3>
                    Try searching for another
                    <br />
                    area or landmark
                </h3>

            </div>
        </>

    )

}

export default NoResult;