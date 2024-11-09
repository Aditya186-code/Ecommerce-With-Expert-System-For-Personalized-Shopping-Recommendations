import React,{useState} from 'react'
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
import { Link } from 'react-router-dom'
import ViewProduct from 'pages/ViewProduct'


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
interface RecommendedProps{
  products:any
  title:String
  colour:String
}
const Recommended:FC<RecommendedProps> = ({products,title,colour}:any) => {
  
  
  const navigate=useNavigate()
  
  const handleView=(id:number)=>{
    navigate(`view-product/${id}`)
  }
  return (
    <>
    <H3 sx={{color:'black'}}>{title}</H3>
    <Box mb={'8vh'} sx={{backgroundColor:`${colour}`,color:'white'}}>
      
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
      

        {products.slice(0,5).map((product:any, index:any) => (
            
            <SwiperSlide>
            

        
        <FlexBox key={index} mt="3vh" ml='3vw' mr='1vw' sx={{cursor:'pointer'}} onClick={()=>handleView(product.product_id)}>
          
          <span style={{maxWidth:'100px',maxHeight:'100px'}}><img src={product.img_link} alt="Men Keds" width="90px" /></span>

          <Box display="flex" flexDirection={'column'} ml="1rem" mr='2vw'>
            <Small>{product.brand}</Small>
            <Rating
              name="read-only"
              size="small"
              defaultValue={product.ratings}
              readOnly
              sx={{ my: "3px" }}
              />
            <Small fontWeight={600}>Rs {Math.ceil(product.discounted_price*120)}</Small>
          </Box>
        </FlexBox>
              
              </SwiperSlide>
      ))}
      
      
        </Swiper>
    </Box>
    {/* {view.id!==-1&&<ViewProduct product={view}/>} */}
      </>
  )
}

export default Recommended