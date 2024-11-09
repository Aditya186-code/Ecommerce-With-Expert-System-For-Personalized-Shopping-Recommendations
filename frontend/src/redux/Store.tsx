import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";
import productReducer from "./productReducer";

export const store=configureStore({
    reducer:{
        cart:cartReducer,
        user:userReducer,
        product:productReducer
    },
})
export type AppDispatch = typeof store.dispatch