import Shimmer from "./Shimmer";
import {useParams } from "react-router-dom";
import RestaurantMenuCategoryContainer from "./RestaurantMenuCategoryContainer";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenuContainer = () => {
    const {resId} = useParams();

    const resInfo = useRestaurantMenu(resId); 


    if(resInfo === null) return <Shimmer/>;
    
    const {name, areaName, costForTwoMessage, cuisines, sla, avgRating, totalRatingsString} =  
    resInfo?.cards[2]?.card?.card?.info;

    const menuCards = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
        
    const menuCateList = menuCards.filter(eachMenuCard => eachMenuCard?.card?.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
    return(
    <div className="res-menu-container">  
        <h1 className="res-name-on-menu-page">{name}</h1>
        <div className="res-details-card">
            <div className="res-details-sub-card">
                <div className="res-details-rating-and-count-container">
                    <div className="res-details-rating-container">
                        <i className="fa-solid fa-star res-card-star"></i>
                        <h3 className="res-card-rating">{avgRating}</h3>
                    </div>
                    <h3 className="res-details-rating-count">({totalRatingsString})</h3>
                </div>
                <h3 className="res-details-dash">-</h3>
                <h3 className="res-details-offer">{costForTwoMessage}</h3>
            </div>
            <p className="res-details-cuisine">{cuisines.join(", ")}</p>
            <p className="res-details-location">{areaName}</p>
            <h4 className="res-details-time">{sla.slaString}</h4>

        </div>
        <div>
             {menuCateList.map((eachCateMenuCard, index) => ( <RestaurantMenuCategoryContainer eachCateMenuCard={eachCateMenuCard}  
             key={eachCateMenuCard.card.card.title} resCatSeparator={index !== menuCateList.length -1 ? true : false} />))}
        </div>
    </div>
    )
}

export default RestaurantMenuContainer;