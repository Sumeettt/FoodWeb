import {render, screen, fireEvent, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import RestaurantMenuContainer from "../RestaurantMenuContainer";
import Header from "../Header";
import Cart from "../Cart"
import MOCK_DATA from "../mocks/resMenuMock.json";
import {act} from "react-dom/test-utils";
import { Provider } from "react-redux";
import appStore from "../../redux/appStore";
import { BrowserRouter } from "react-router-dom";


global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
           return Promise.resolve(MOCK_DATA);
        }
    })
})


test("should render res Menu with accordion", async () => {
    await act(async () => render(
        <Provider store={appStore}>
            <RestaurantMenuContainer/>
        </Provider>
    ));

    const accordionHeader = screen.getByText("Desserts (4)")
    expect(accordionHeader).toBeInTheDocument();

    fireEvent.click(accordionHeader);

    const dessertsRendered = screen.getAllByTestId("resMenuCards");
    expect(dessertsRendered.length).toBe(4);


});


test("should check cart and cart item count on adding item to cart", async () => {
    await act(async () => render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
                <RestaurantMenuContainer/>
            </Provider>
        </BrowserRouter>
    ));

    const cartIcon = screen.getByTestId("cartIcon");
    expect(cartIcon).toBeInTheDocument();

    const cartItemBeforeAdding = screen.getByTestId("cartItemCount");
    expect(cartItemBeforeAdding).toHaveTextContent("(0)");

    const accordionHeader = screen.getByText("Desserts (4)")
    fireEvent.click(accordionHeader);
    
    const addButtons = screen.getAllByTestId("addBtn");
    fireEvent.click(addButtons[0]);

    const cartItemsAfterAdding = screen.getByTestId("cartItemCount");
    expect(cartItemsAfterAdding).toHaveTextContent("(1)");


});


test("should remove cart item on clicking remove button", async () => {
    await act(async () => render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
                <Cart/>
            </Provider>
        </BrowserRouter>
    ))

    //cartItemsBeforeRemoving should be 1 since in the previous test we added one item to the cart
    const cartItemsBeforeRemoving = screen.getByTestId("cartItemCount");
    expect(cartItemsBeforeRemoving).toHaveTextContent("(1)");

    const cartItemRemoveButtons = screen.getAllByTestId("removeBtn");
    fireEvent.click(cartItemRemoveButtons[0]);

    const cartItemsAfterRemoving = screen.getByTestId("cartItemCount");
    expect(cartItemsAfterRemoving).toHaveTextContent("(0)");

})



test("should check cart items rendered", async () => {
    await act(async () => render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
                <RestaurantMenuContainer/>
                <Cart/>
            </Provider>
        </BrowserRouter>
    ));

    const cartIcon = screen.getByTestId("cartIcon");
    expect(cartIcon).toBeInTheDocument();


    const accordionHeader = screen.getByText("Desserts (4)")
    fireEvent.click(accordionHeader);
    
    const addButtons = screen.getAllByTestId("addBtn");
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[1]);

    const renderedCartItems = screen.getAllByTestId("cartItems");
    expect(renderedCartItems.length).toBe(2);

});

test("should remove all cart items on clicking Clear Cart", async () => {
    await act(async () => render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
                <Cart/>
            </Provider>
        </BrowserRouter>
    ));


    const creatCartButton = screen.getByRole("button", {name:"Clear Cart"}) 
    fireEvent.click(creatCartButton);

    const cartItemsCount = screen.getByTestId("cartItemCount");
    expect(cartItemsCount).toHaveTextContent("(0)");

})