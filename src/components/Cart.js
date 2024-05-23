
import { useSelector } from "react-redux";
import CartEmpty from "./CartEmpty";
import CartItems from "./CartItems";
import { clearCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Cart = () => {
    const [isPaymentDone, setIsPaymentDone] = useState(false);
    const cartItems = useSelector(store => store.cart.items);
    const userInfo = useSelector(store => store.user.user);
    const totalPrice = cartItems.reduce((acc, eachItem) => acc + (eachItem.price || eachItem.defaultPrice), 0);

    const dispatch = useDispatch();

    const handleRemoveAll = () => {
        dispatch(clearCart(cartItems));
    }
    
    const handlePayNow = () => {
        setTimeout(() => {
            setIsPaymentDone(true);
            setTimeout(() => {
                dispatch(clearCart(cartItems));
            }, 1000);
        }, 2000);    
        
    }

    const paymentStatus = isPaymentDone ? "Payment Successful" : "Pay Now";

    const {firstName, lastName, addressType, address} = userInfo;
    const addressIcon = addressType === "Office" ?  <i class="fa-solid fa-building"></i> : <i className="fa-solid fa-house-chimney"></i>;
 
    return (
        cartItems.length === 0 ? (
            <CartEmpty/>  
        ) : (
            <div className="cart-container">
            <div className="cart">
                <div className="cart-items-container">
                    {cartItems.map(eachCartItem => (
                        <CartItems eachCartItem={eachCartItem} key={eachCartItem.id} />
                    ))}
                    <button className="cart-items-remove-all-btn"
                        onClick={handleRemoveAll}
                    >Clear Cart </button>
                    <hr className="cart-horizontal-line"/>
                    <div className="cart-total-price-container">
                        <h3 className="cart-total-price-text">TO PAY</h3>
                        <h3 className="cart-total-price-text">₹{totalPrice/100}</h3>
                    </div>    
                </div>    
                <div className="cart-user-and-payment-container">
                    <div className="cart-user-container">
                        <h2 className="cart-user-name">{firstName} {lastName}</h2>
                        <div className="cart-delivery-address-icon-and-type-container">
                            {addressIcon}
                            <p className="cart-user-address-type">{addressType}</p>
                        </div>
                        <p className="cart-user-address">{address}</p> 
                    </div>    
                    <button onClick={handlePayNow}  className="cart-payment-btn">
                        {paymentStatus}
                    </button>
                </div>
            </div>
            </div>
        )
    );
    
};

export default Cart;
