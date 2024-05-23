import { SWIGGY_RES_MENU_API, SWIGGY_RES_MENU_API_CORS_ENABLED } from "./constants";
import { useEffect, useState } from "react";

//custom hook for fetching res menu data

const useRestaurantMenu = (resId) => {
    const [resMenuInfo, setResMenuInfo] = useState(null);

    useEffect(() => {
        fetchData();
    }, [])
    
    const fetchData = async () => {
        const data = await fetch(SWIGGY_RES_MENU_API_CORS_ENABLED + resId);
        const json = await data.json();
          setResMenuInfo(json.data);
        
    };
    return resMenuInfo;
}

export default useRestaurantMenu;