import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import appStore from "../../redux/appStore"
import Header from "../Header"
import { BrowserRouter } from "react-router-dom";



test("should check cart and cart item count", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    );

    const cartIcon = screen.getByTestId("cartIcon");
    expect(cartIcon).toBeInTheDocument();

    
    const cartItemCountElement = screen.getByTestId("cartItemCount");
    expect(cartItemCountElement).toHaveTextContent("(0)");

});


test("renders hamburger button for small viewport sizes", () => {
    global.innerWidth = 768;

    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    );

    const hamburgerButton = screen.getByTestId("hamburgerButton");
    expect(hamburgerButton).toBeInTheDocument();

});

test("does not render hamburger button for large viewport sizes", () => {
    global.innerWidth = 769;

    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    );

    const hamburgerButton = screen.queryByTestId("hamburgerButton"); 
    expect(hamburgerButton).not.toBeInTheDocument();

});