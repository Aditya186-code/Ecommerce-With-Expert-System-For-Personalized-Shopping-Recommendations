import React from 'react'
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
import {FC,Fragment} from 'react'
import { productList } from '../ProductList'
import { H3 } from 'components/Typography'
import { useNavigate } from 'react-router'


export const StyledProductWrapper=styled(Box)(()=>({
  position:'absolute',
  left:'8vw',
  display:'flex',
  width:'max-content',
  
  justifyContent:'center',
  padding:'0.5vw',
  backgroundColor:'#2c2d2d',
  color:'white'
}))

const Popular:FC = () => {
  const navigate=useNavigate()
  const handleView=(id:number)=>{
    navigate(`view-product/${id}`)
  }
  return (
    <>
    <H3 sx={{color:'black'}}>Most Popular Products</H3>
    <Box mb={'8vh'} sx={{backgroundColor:'#ff4040',color:'white'}}>
      
      <Swiper 
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={30}
      slidesPerView={4}
      navigation
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: false }}
      onSwiper={(swiper:any) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      
      >
      

        {productList.map((product, index) => (
            
            <SwiperSlide>
            

            <FlexBox key={index} mt="3vh" ml='3vw' mr='1vw' sx={{cursor:'pointer'}} onClick={()=>handleView(index)} >
          <img src={product.image} alt="Men Keds" width="90px" />

          <Box display="flex" flexDirection={'column'} ml="1rem" mr='2vw'>
            <Small>{product.title}</Small>
            <Rating
              name="read-only"
              size="small"
              defaultValue={product.rating}
              readOnly
              sx={{ my: "3px" }}
              />
            <Small fontWeight={600}>${product.price}</Small>
          </Box>
        </FlexBox>
              </SwiperSlide>
      ))}
      
      
        </Swiper>
    </Box>
      </>
  )
}

export default Popular