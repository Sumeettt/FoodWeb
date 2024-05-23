import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom"
import RestaurantCard from "../RestaurantCard";
import MOCK_DATA from "../mocks/resCardMock.json";


test("should render RestaurantCard component with props Data", () => {
  
    render(<RestaurantCard eachResInfo={MOCK_DATA}/>);

    const name = screen.getByText("Hotel Sudha");

    expect(name).toBeInTheDocument();

})