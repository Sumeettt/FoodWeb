import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {act} from "react-dom/test-utils";
import Body from "../Body";
import MOCK_DATA from "../mocks/resListMock.json";
import { BrowserRouter } from "react-router-dom";


global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA);
        }
    });
});


test("should Search Res List for burger text input ", async () => {
    await act(async () => render(
    <BrowserRouter>
        <Body/>
    </BrowserRouter>
    ));

    const resCardsBeforeSearch = screen.getAllByTestId("resCard");
    expect(resCardsBeforeSearch.length).toBe(20);

    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, {target: {value: "burger"}});
    fireEvent.keyDown(searchInput, {key:"Enter", code: "Enter", charCode: 13});

    // screen should load 4 res cards 

    const resCardsAfterSearch = screen.getAllByTestId("resCard");
    expect(resCardsAfterSearch.length).toBe(4);
});


test("should filter top rated Res List", async () => {

    await act(async () => render(
        <BrowserRouter>
            <Body/>
        </BrowserRouter>
    ));

    const resCardsBeforeSearch = screen.getAllByTestId("resCard");
    expect(resCardsBeforeSearch.length).toBe(20);

    const topRatedButton = screen.getByTestId("topRatedButton");
    fireEvent.click(topRatedButton);

    const topRatedResList = screen.getAllByTestId("resCard");
    expect(topRatedResList.length).toBe(6);

});