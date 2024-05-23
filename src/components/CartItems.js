import { SWIGGY_RES_MENU_IMAGES } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeItem } from "../redux/cartSlice";

const CartItems = (props) => {
    const {eachCartItem} = props;
    const {name, price, defaultPrice, imageId} = eachCartItem;
    const itemImage = imageId ?  SWIGGY_RES_MENU_IMAGES  + imageId : null;


    const dispatch = useDispatch();

    const handleRemoveEachItem = () => {
        dispatch(removeItem(eachCartItem));
    }

    const eachCartItemCardCss = itemImage ? "each-cart-item-card" : "each-cart-item-card-align-center";
    const resCartImageContainerCss = itemImage ? "each-cart-item-image-container" : "each-cart-item-image-container-align-center";

    return(
        <div className= {eachCartItemCardCss} data-testid="cartItems"> 
            <div className="each-cart-item-detail">
                <h3 className="each-cart-item-name">{name}</h3>  
                <h3 className="each-cart-item-price">₹{price/100 || defaultPrice/100}</h3>
            </div>
            <div className={resCartImageContainerCss}>
                    {itemImage && <img alt="item image" className="each-cart-item-img" src={itemImage}/>}
                    <button className="each-cart-item-remove-btn" 
                    onClick={handleRemoveEachItem} 
                    data-testid = "removeBtn"
                    >        
                        Remove
                    </button>
                </div>
        </div>
    )
}

export default CartItems;