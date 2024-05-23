import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Error from "./components/Error";
import RestaurantMenuContainer from "./components/RestaurantMenuContainer";
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom"
import ScrollToTop from "./ScrollToTop";
import Shimmer from "./components/Shimmer";
import { lazy } from "react";
import { Provider } from "react-redux";
import Cart from "./components/Cart";
import appStore from "./redux/appStore";


const About = lazy(()=> import("./components/About"));

const AppLayout = () => {
    return(
        <Provider store={appStore}>
            <div className="app">
                <Header />
                <Outlet />
                <ScrollToTop/>
            </div>
        </Provider>
    )
}

const appRouter = createBrowserRouter([
    {
        path : "/",
        element : <AppLayout/>,
        children : [
            {
                path : "/",
                element : <Body/>
            },
            {   
                path : "/about",
                element :   (
                    <Suspense fallback={<Shimmer/>}><About/></Suspense>
                ) ,
            }, 
            {
                path : "/restaurant/:resId",
                element : <RestaurantMenuContainer/>
            },
            {
                path : "/cart",
                element : <Cart/>
            },
        
        ],
        errorElement : <Error/>
    },
    
])



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} /> );