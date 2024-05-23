import { useState } from "react";
import RestaurantMenuCard from "./RestaurantMenuCard";

const RestaurantMenuCategoryContainer = (props) => {
    const [showMenu, setShowMenu] = useState(false);
  
    const {eachCateMenuCard, resCatSeparator} = props; 
    
    const {title} = eachCateMenuCard?.card?.card;
    const countOfDishes = eachCateMenuCard?.card?.card?.itemCards?.length;

    const menuListPerCate = eachCateMenuCard?.card?.card?.itemCards;    
   

    const handleClick = () => {
        setShowMenu(!showMenu);
    };


    return(
        <div className="res-menu-cate-container">
            <div className="res-menu-cate-title-container" onClick={handleClick}>
                <h2 className="res-menu-cate-title">{title} ({countOfDishes})</h2>
                <i className="fa-solid fa-angle-down res-menu-cate-down-arrow"></i>
            </div>    
            
            <div>
                {showMenu && menuListPerCate.map((eachMenu, index) => <RestaurantMenuCard 
                eachMenuInfo={eachMenu?.card?.info} key={eachMenu.card.info.id} 
                eachMenuSeparator = {index !== menuListPerCate.length -1 ? true : false} />)}
            </div>
            {resCatSeparator && <div className="res-menu-cate-separator"></div> }
        </div>
    )
}

export default RestaurantMenuCategoryContainer;