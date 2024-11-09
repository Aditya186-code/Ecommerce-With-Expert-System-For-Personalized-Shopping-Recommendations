import { Theme } from '@emotion/react'
import { Box, styled,Rating } from '@mui/material'
import FlexBox from 'components/FlexBox'
import {  Small } from 'components/Typography'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useTitle from 'hooks/useTitle'
import React,{FC,Fragment,useEffect,useState} from 'react'
import SearchProduct from './SearchProduct';
import { productList } from './ProductList'
import { H3 } from 'components/Typography'
import { Recommend } from '@mui/icons-material';
import Popular from './ProductShops/MostPopular';
import Fashion from './ProductShops/Fashion';
import Tech from './ProductShops/Tech';
import Recommended from './ProductShops/Recommended';
import axios from 'utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { getElecProduct, getHomeProduct, getTechProduct, selectElecproduct, selectHomeproduct, selectTechproduct } from 'redux/productReducer';


export const StyledProductWrapper=styled(Box)(()=>({
  display:'block',
  fontFamily: "'Philosopher', sans-serif",
  justifyContent:'center',
  padding:'0.5vw',
  // backgroundImage:"url('/static/back.jfif')",
  color:'white',
  height:'88vh'
}))
const Shop:FC = () => {
  const dispatch=useDispatch<any>()
  useTitle("Browse Products")
  
useEffect(()=>{
dispatch(getHomeProduct())
dispatch(getTechProduct())
dispatch(getElecProduct())
console.log("Hello")
},[])

 

  
  
  const elecproducts:any=useSelector<any>(selectElecproduct)
  const techproducts:any=useSelector<any>(selectTechproduct)
  const homeproducts:any=useSelector<any>(selectHomeproduct)
    
  
  return (
    <StyledProductWrapper>
      <SearchProduct/>
      <Recommended products={techproducts} title={'Sports and Outdoors'} colour={'#2c2d2d'}/>
      <Recommended products={homeproducts}
       title={'Clothing, Shoes and Jewellery'} colour={'#cccccc'}/>
      <Recommended products={elecproducts} title={'Toys and Games'} colour={'#ff4040'}/>
      {/* <Fashion/> */}
      {/* <Tech/> */}
    </StyledProductWrapper>
    )
}

export default Shop
