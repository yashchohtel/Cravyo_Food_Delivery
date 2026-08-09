import './MapPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import SearchBar from '../../Components/Ui/SearchBar/SearchBar';

const MapPage = () => {

    // useNavigate hook to navigate to previous page
    const navigate = useNavigate();

    // initilize use location
    const location = useLocation();

    /* -------------------------------------- */

    console.log(location.state?.location);
    console.log(location.state?.mode);

    return (

        <>
            <div className="mapPage container">

                {/* location page header */}
                <div className="mapHeader">

                    <div
                        className="mapIconBack"
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft />

                    </div>

                    {/* search bar */}
                    <SearchBar />

                </div>

                {/* map */}
                <div className="mapContainer">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt earum molestias temporibus aliquid nostrum deserunt, placeat repudiandae excepturi debitis laborum. Vel nostrum consectetur perferendis sed eaque voluptatum ad fugit beatae culpa similique quam laudantium quas, ipsa accusamus aspernatur dicta possimus, pariatur sequi expedita libero explicabo aliquid deserunt esse? Odit perspiciatis veniam explicabo expedita, neque eaque eveniet earum officia, molestias, voluptate iste aperiam nemo mollitia. Corporis impedit placeat quidem distinctio eveniet quas sequi mollitia assumenda eligendi quis ab totam enim, quisquam, nihil consequuntur quam a harum? Autem eos atque quae, voluptates itaque incidunt eum est accusamus hic dolores, minus id quis sit asperiores suscipit! Temporibus minus delectus sit ipsam quo doloremque id illum et qui architecto dignissimos illo tenetur iure obcaecati distinctio optio, excepturi consectetur? Totam iure enim eos quis facilis incidunt recusandae ea culpa provident magni exercitationem, natus eligendi possimus sed molestiae ex similique commodi quod accusamus eum impedit fugit nesciunt soluta dolorem? Deserunt earum dolor enim laudantium aut, debitis eos laboriosam sed totam tenetur iusto rem qui sunt maxime porro exercitationem blanditiis fugiat? Sed officia debitis mollitia, necessitatibus similique rerum doloremque atque beatae architecto neque et excepturi molestias laudantium iure consequuntur quos eos at doloribus fugit aliquid, dolor, quibusdam vitae fuga. Aspernatur, sed! Excepturi reiciendis molestias nam assumenda vel provident, aliquid, nulla, autem ipsum dolore quibusdam aspernatur voluptate. Fugiat deserunt odit ullam molestias hic at odio eligendi, eos necessitatibus magni pariatur animi ex omnis est laborum. Ipsam expedita et quisquam voluptas, ipsum beatae aliquam soluta animi vero omnis debitis fugiat unde cumque necessitatibus repellat quos natus quae deserunt mollitia error consequatur distinctio at? Amet nobis repellat asperiores iusto earum soluta odio quia, qui deleniti impedit delectus voluptates illo, cum sed voluptatem! Placeat omnis voluptatibus vel asperiores eius inventore laborum blanditiis distinctio, quas vitae excepturi ab dolorum. Molestiae eveniet iusto facilis nobis deserunt, libero suscipit ullam. Iusto expedita nemo sunt reprehenderit? Exercitationem sunt consequatur ullam illo aut tempore, reprehenderit velit molestias placeat explicabo, ad commodi a. Iure non, consequatur quisquam eum voluptatibus tenetur et amet, minus neque nobis quos impedit nostrum cum reiciendis maxime? Ipsum et exercitationem laborum maiores, ipsa voluptates, error, eum minima tempore nostrum commodi nobis repudiandae? Nemo magnam accusamus laboriosam voluptatibus? Similique cupiditate voluptate veniam ex, nemo ipsam, unde culpa autem esse, nostrum nulla? Laudantium, numquam quidem recusandae quibusdam ex aut iusto excepturi quisquam pariatur quam totam odio harum officiis voluptatum, repellendus eaque nihil corrupti aliquam vero voluptatem dolore! Officia hic iusto asperiores nisi accusantium at. Vitae minus dolore earum repellat molestiae modi laboriosam adipisci in quasi ut voluptatum, totam quos maxime, asperiores unde quidem recusandae quis inventore. Molestias aliquid sunt accusantium eligendi, maxime modi. Tempora quasi dolorum nostrum, quaerat id omnis placeat, rerum, asperiores sequi culpa architecto quibusdam a repellendus. Enim libero possimus nisi quas veritatis atque at sequi fugiat non dolorum doloremque totam laboriosam modi rem aliquam fuga quo magni consequatur, optio eius earum. Repudiandae eum veritatis blanditiis tempore. Voluptates, porro numquam enim illo vel dolorem laudantium illum deleniti omnis? Non quibusdam iure itaque vero rem hic, distinctio saepe dolores beatae harum, ipsa nam deserunt numquam facilis minima suscipit perferendis fugiat maxime, id voluptatum quas atque. Porro repellendus est voluptatem eligendi laudantium recusandae consectetur, rem iste commodi, qui distinctio, fugiat neque corrupti et aspernatur eum. Molestiae dolore explicabo consequatur architecto doloribus dolorum consectetur temporibus eaque esse voluptatibus soluta ipsum debitis accusantium distinctio nemo ad est quasi vitae saepe quod, nisi tenetur reiciendis ipsam suscipit. Animi architecto provident voluptatem quam perferendis distinctio ad labore odit repellendus cumque, reiciendis possimus, magni aliquam dignissimos quaerat quibusdam? Nostrum quisquam, natus, at provident ipsam, ad voluptas molestias similique optio nihil animi accusamus rerum laboriosam sed voluptatem tempora quas sequi maiores dicta eveniet itaque magni. Quo rerum architecto neque tempora obcaecati eius dolorem ab illo totam id alias ducimus iste sed reiciendis, veritatis, accusamus iure tempore eligendi expedita debitis modi quod? Facilis minima quia voluptas nemo libero voluptatum ex ab, praesentium eius, voluptatem cupiditate illum nihil dicta quos nobis explicabo atque, ipsa beatae earum? Accusamus nam, minima vitae fugit libero non provident illo sequi distinctio porro ratione, placeat officia nobis totam reiciendis quo quasi consequuntur aliquam optio repellendus repellat assumenda cum? Dolor impedit nihil, ducimus voluptate reiciendis sed dicta aliquid doloremque libero deleniti quas laboriosam doloribus sint magnam necessitatibus explicabo expedita at ex omnis consequuntur. Sint voluptatum nam ea dicta harum? Quidem eligendi saepe laborum aperiam blanditiis qui nam eos rerum incidunt sint doloribus tenetur nulla dolores eveniet eaque porro natus amet totam, sequi, voluptate enim illo. Possimus, cumque. Dolorum, dolorem? Nam, reiciendis. Natus quisquam, nulla ut sequi illum quis veritatis, voluptatem doloremque voluptatibus quasi corporis. Voluptate assumenda, aperiam consectetur, nulla dolores voluptatem quod magni accusantium cupiditate rem, earum enim numquam sunt maiores? Porro dolore temporibus aspernatur sapiente maxime fuga corrupti nulla est, repudiandae atque, itaque magnam obcaecati neque, quaerat reiciendis! Veritatis commodi enim quibusdam ullam nisi. Tempore fugit qui vel repudiandae rerum itaque eum nesciunt aliquid recusandae! Quis recusandae inventore nisi vero tenetur sed modi illum quae provident aperiam voluptas aspernatur consectetur voluptatum porro, odit rerum voluptatibus velit quos repudiandae dolore explicabo suscipit, beatae, maxime quibusdam! Quae ab reiciendis ex, quasi quod iste iusto iure sunt, repellendus ut aut, possimus veritatis accusamus ad! Dicta vitae praesentium iure officiis consequatur? Exercitationem mollitia minima inventore, esse necessitatibus qui omnis veniam. Quisquam quasi placeat nemo aliquid temporibus ut eligendi. Impedit, eius atque totam quam nobis animi non at commodi possimus nostrum incidunt rem delectus magni ipsum architecto veniam accusantium similique? Laborum accusantium eius placeat iusto? Ut dolor provident nemo incidunt magni corporis doloremque non. Quam at enim facere ipsa iure doloremque modi, in, commodi reiciendis nobis tempora iusto voluptas praesentium veniam, obcaecati earum nam sed natus facilis tenetur. Aperiam sunt culpa maiores fugiat deleniti neque cumque aliquid ad accusamus consequatur error expedita fuga ducimus facilis laborum blanditiis aspernatur esse modi dicta, quis odio velit, nostrum inventore accusantium? Possimus nihil illum sit consequatur ab. Dolorum, aut aliquid? Nesciunt asperiores, numquam nam non unde quae quod vel dolorum eligendi? Assumenda, earum? Fuga, aliquid quisquam?
                </div>

            </div>
        </>

    )

}

export default MapPage;

// // Save the selected location to recent searches
// const saveRecentSearch = () => {

//     // get recent searches data from local storage
//     const recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

//     const updatedSearches = [
//         data,
//         ...recentSearches.filter((item) => item.id !== data.id)
//     ].slice(0, 5);

//     // save to local storage
//     localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

// };