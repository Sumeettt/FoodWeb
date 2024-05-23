import { SWIGGY_RES_MENU_IMAGES } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { useState } from "react";

const RestaurantMenuCard = (props) => {
    const {eachMenuInfo} = props;
    const {name,description, imageId, price, defaultPrice} = eachMenuInfo;
    const menuImage = imageId ?  SWIGGY_RES_MENU_IMAGES  + imageId : null;
    const descriptionText = description ? description : "";
    const {eachMenuSeparator} = props;
    const [isExpanded, setIsExpanded] = useState(false);


    const resMenuCardContainerCss = menuImage ? "res-menu-card" : "res-menu-card-align-center";
    const resMenuImageContainerCss = menuImage ? "res-menu-img-container" : "res-menu-img-container-align-center"
    
    const dispatch = useDispatch();

    const handleAddClick = () => {
        dispatch(addItem(eachMenuInfo));
    }

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    }

    const trucateText = (text, length) => {
        if(text.length <= length) {
            return text;
        }

        return `${text.substring(0, length)}...`;
    }


    return (
        <>
        <div className={resMenuCardContainerCss} data-testid="resMenuCards">
            <div className="res-menu-sub-card">
                <h3 className="res-menu-name">{name}</h3>
                <h3 className="res-menu-price">₹{price/100 || defaultPrice/100}</h3>
                <p className="res-menu-description">
                    {isExpanded ? descriptionText : trucateText(descriptionText, 100) }
                    {descriptionText.length >100 && (
                        <span onClick={toggleReadMore} className="read-more">
                            {isExpanded ? " read less" : "read more"}
                        </span>
                    )}
                </p>
            </div>
            <div className={resMenuImageContainerCss}>
                {menuImage&& <img alt="menu image" className="res-menu-img" src={menuImage}/>}
                <button className="res-menu-add-btn" 
                onClick={handleAddClick}
                data-testid = "addBtn"
                >ADD</button>
            </div>
        </div>
        {eachMenuSeparator && <hr className="res-menu-horizontal-line"/>}
        </>
    )
} 

export default RestaurantMenuCard;