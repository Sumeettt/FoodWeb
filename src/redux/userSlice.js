import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        user : {
            firstName : "Sumeet",
            lastName : "Parmar",
            addressType : "Home",
            address : "1234 xxx Street, Anytown, XXXX"
        }
    }
});



export default userSlice.reducer;