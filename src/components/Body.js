import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import {SWIGGY_RES_API, SWIGGY_RES_API_CORS_ENABLED} from "../utils/constants";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredListOfRestaurants, setFilteredListOfRestaurants] = useState([]);
    const [searchInput, setSearchInput] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(SWIGGY_RES_API_CORS_ENABLED);
        
        const json = await data.json(); 
        const fetchedResList = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        setListOfRestaurants(fetchedResList);
        setFilteredListOfRestaurants(fetchedResList);

    }

    const topResFilter = () => {
        const topRes = listOfRestaurants.filter(eachRes => eachRes.info.avgRating >= 4.5);
        setFilteredListOfRestaurants(topRes);
    }
    
    const allResFilter = () => {
        setFilteredListOfRestaurants(listOfRestaurants);
    }

    const handleInputChange  = (e) => {
        const search = e.target.value; 
        setSearchInput(search);

        if(search === ""){
            setFilteredListOfRestaurants(listOfRestaurants);
        }
    }
    
    const handleEnterPress = (e) => {
        if (e.key === "Enter") {
            const filteredResult = listOfRestaurants.filter(eachRes => {
                const resNameIncludesInput = eachRes.info.name.toLowerCase().includes(searchInput.toLowerCase());
                const cuisinesIncludesInput = eachRes.info.cuisines
                    .map(cuisine => cuisine.toLowerCase())
                    .some(cuisine => cuisine.includes(searchInput.toLowerCase()));
                return resNameIncludesInput || cuisinesIncludesInput;
            });
    
            setFilteredListOfRestaurants(filteredResult);
        }
    };
    

    const handleClearInput = () => {
        setSearchInput("");
        setFilteredListOfRestaurants(listOfRestaurants);
    }

    if (listOfRestaurants.length === 0) return <Shimmer/>;
        
    
    return (
        <div className="body">
                    <div className="filter">
                        <div className="filter-btns-container">
                            <button
                                className="filter-btn"
                                onClick={topResFilter}
                                data-testid="topRatedButton"
                            >
                                Top Rated Restaurants
                            </button>
                            <button 
                                className="filter-btn"
                                onClick={allResFilter}
                            >
                                All
                            </button>
                        </div>
                        <div className="input-container">
                            <input 
                                className="input" 
                                type="text" 
                                placeholder="Search for restaurants and food"
                                onChange={handleInputChange}
                                onKeyDown={handleEnterPress}
                                value={searchInput}
                            />
                            {searchInput && (
                                <button className="input-x-btn" onClick={handleClearInput}>✕</button>
                            )}
                        </div>    
                    </div>
                    <div className="res-container">
                        {filteredListOfRestaurants.map(eachRes => 
                            <Link key={eachRes.info.id} to={"/restaurant/" + eachRes.info.id}>
                                <RestaurantCard eachResInfo={eachRes?.info} />
                            </Link>
                        )}
                    </div>        
        </div>
    );
    
}


export default Body;