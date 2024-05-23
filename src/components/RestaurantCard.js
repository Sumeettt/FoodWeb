import {SWIGGY_RES_IMAGES} from "../utils/constants";

const RestaurantCard = (props) => {
    const {eachResInfo} = props;
    const {cloudinaryImageId, areaName, name, avgRating, cuisines, sla} = eachResInfo;
    const {slaString}  = sla;

    const resImage = SWIGGY_RES_IMAGES + cloudinaryImageId;


    return(
        <div className="res-card" data-testid="resCard">
            <img alt="res image" className="res-img" src={resImage} />
            <div className="res-card-info-container">
            <h3 className="res-name">{name}</h3>
            <div className="res-card-rating-time-container">
                <div className="rating-container">
                    <i className="fa-solid fa-star res-card-star"></i>
                    <p className="res-card-rating">{avgRating}</p>
                </div>
            <p className="res-card-time">{slaString}</p>
            </div>
            <p className="res-card-cuisine">{cuisines.join(", ")}</p>
            <p className="res-card-location">{areaName}</p>
            </div>
            
        </div>
    )
}

export default RestaurantCard;