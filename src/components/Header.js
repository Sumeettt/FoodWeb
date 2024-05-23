import { useEffect, useState } from "react";
import { LOGO } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isOnline = useOnlineStatus();
    const cartItems = useSelector(store => store.cart.items);
    const cartItemCount = cartItems.length;
    const { firstName } = useSelector(store => store.user.user);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        // Removing event listener when component unmounts to avoid unnecessary state update
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
       
    };

    const getCart = () => {
        return (
            <Link to="/cart">
                <i className="fa-solid fa-cart-shopping cart-icon" data-testid= "cartIcon" ></i> 
                <span className="cart-item-count" data-testid="cartItemCount"   >({cartItemCount})</span> 
            </Link>
        )
    }
 
    return (
        <div className="header">
            <div className="logo-container">
                <Link to="/"><img className="logo" alt="logo" src={LOGO} /></Link>     
            </div>
            <div className="cart-hamburger-container">
                {windowWidth <= 768 ? getCart() : ""
                }
                {windowWidth <= 768 ? 
                    <button className="hamburger" onClick={toggleMenu} data-testid="hamburgerButton"  >
                        {isMenuOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars hamburger-icon"></i>}  
                    </button> : ""
                }
            </div>
            <div className={`nav-items ${isMenuOpen ? "open" : ""}`}>
                <ul>
                    <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                    <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
                    {isMenuOpen && (windowWidth <=768) ? "" : <li>{getCart()}</li> }
                    <li>Hello, {firstName} {isOnline ? "🟢" : "🔴"}</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;