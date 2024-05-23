
import { useNavigate } from "react-router-dom";

const CartEmpty = () => {
   
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }

    return(
        <div className="empty-cart-container">
           <i className="fa-solid fa-burger empty-cart-icon"></i>
           <h2 className="empty-cart-heading">Your cart is empty</h2>
           <p className="empty-cart-description">You can go to home page to view more restaurants</p>
            <button className="empty-cart-btn" 
            onClick={handleClick}
            >see resturants</button>
        </div>
    )
}

export default CartEmpty;