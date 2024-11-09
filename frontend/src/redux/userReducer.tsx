import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "utils/axios";
import useAuth from "hooks/useAuth";




const path=localStorage.getItem('filePath')
const initialState={
    current_img:path
}
const userSlice=createSlice({name:'user',initialState,reducers:{
    UPDATE_USER(state,action){
        state.current_img=action.payload
    }
}})
export const{UPDATE_USER}=userSlice.actions
export const selectUser=(state:any)=>state.user.current_img
export default userSlice.reducer