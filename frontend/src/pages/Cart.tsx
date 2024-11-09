
import { Add, Remove } from "@mui/icons-material";
import {styled, Box, Button} from '@mui/material'

import { H1, Span } from "components/Typography";
import { FC, useEffect } from "react";
import ProductDetails from "./ProductShops/ProductDetails";
import { useNavigate } from "react-router";
import useTitle from "hooks/useTitle";
import { useDispatch, useSelector } from "react-redux";
import { getCart, selectCart } from "redux/cartReducer";

import { AppDispatch } from "redux/Store";


const cartproducts=[{id:1,img:"https://th.bing.com/th/id/R.d213ca1ac5146636d7bb0ffda50cd3d3?rik=02lnXtrweQFIkg&riu=http%3a%2f%2fstatic.musiciansfriend.com%2fderivates%2f19%2f001%2f219%2f705%2fDV020_Jpg_Jumbo_421541.001_black_pair_V.jpg&ehk=hogZl1LZkMkz5Vts70F%2bmG0veGN8iIeNCdJegvCCxVk%3d&risl=&pid=ImgRaw&r=0",
name:'Converse Styled',size:'43', color:'black',amount:2,total:600},{id:2,img:"https://www.notebookcheck.net/fileadmin/Notebooks/Apple/iPad_Air_2022/DSC0960586.JPG",
name:'IPad Air 5',size:'-', color:'Silver',amount:1,total:700}]
const Wrapper = styled(Box)(({theme}:any)=>({
    padding: '20px'
}))
 
 

const Title = styled(H1)(({theme}:any)=>({ fontWeight: 300,
    textAlign: 'center'}))
 


const Top = styled(Box)(({theme}:any)=>({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
}))
  




const TopText = styled(Span)(({theme}:any)=>({
    textDecoration: 'underline',
    cursor: 'pointer',
    margin: '0px 10px'
}))
 


const Bottom = styled(Box)(({theme}:any)=>({
    display: 'flex',
    justifyContent: 'space-between'
}))
  

const Info = styled(Box)(({theme}:any)=>({
  flex: '3'
}))


export const Product = styled(Box)(({theme}:any)=>({
    display: 'flex',
    justifyContent: 'space-between'
}))
  
 

export const ProductDetail = styled(Box)(({theme}:any)=>({
    flex: 2,
    display: 'flex'
}))
  




export const Details = styled(Box)(({theme}:any)=>({
    padding: '20px',
    display: 'flex',
    marginLeft:'2vw',
    flexDirection: 'column',
    justifyContent: 'space-around'
}))
  




export const ProductColor = styled(Box)(({theme}:any)=>({
    width: '20px',
    height: '20px',
    borderRadius: '50%'
    
}))
  


const ProductSize = styled(Span)

export const PriceDetail = styled(Box)(({theme}:any)=>({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  
}))
  

export const ProductAmountContainer = styled(Box)(({theme}:any)=>({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
}))
  


export const ProductAmount = styled(Box)(({theme}:any)=>({
    fontSize: '24px',
    margin: '5px'
}))
  
  


export const ProductPrice = styled(Box)(({theme}:any)=>({
    fontSize: '20px',
    fontWeight: 200
}))
  
  





const Summary = styled(Box)(({theme}:any)=>({
    flex: 1,
    border: '0.5px solid lightgray',
    borderRadius: '10px',
    padding: '20px',
    height: '32vh',
    marginLeft:'2vh',
    width:'15vw',
    backgroundColor:'#2c2c2c',
    color:'white',
    
}))
  


const SummaryTitle = styled(H1)(({theme}:any)=>({
    fontWeight: 200,
    textAlign:'center'
}))
  


const SummaryItem = styled(Box)(({theme}:any)=>({
    margin: '1vw 3vw',
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: '400',
    fontSize: '18px'
}))
 
const Cart:FC = () => {
console.log("hello")
const cart=useSelector(selectCart)
const dispatch=useDispatch<any>()
useEffect(()=>{
  dispatch(getCart())
})
  

console.log("pello")
   
  
  
  // const cart=useSelector(selectCart)
  
  const navigate=useNavigate()
    useTitle("Cart")
    console.log("hello")
    // const cart:any=useSelector(selectCart)
    console.log('cart')
    
   
  return (
    <Box maxHeight={'100vh'}>
      
      <Wrapper>
        <Title>My Cart</Title>
        <Top>
          <Button onClick={()=>navigate('/dashboard/shop')}>CONTINUE SHOPPING</Button>
          <TopText>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopText>
          <Button variant="outlined" >CHECKOUT NOW</Button>
        </Top>
        <Bottom>
          <Info>
          {cart.map((item:any,index:number)=>{return(<ProductDetails product={item}/>)})}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <Span>Subtotal</Span>
              <Span>$ 80</Span>
            </SummaryItem>
            <SummaryItem>
              <Span>Estimated Shipping</Span>
              <Span>$ 5.90</Span>
            </SummaryItem>
            <SummaryItem>
              <Span>Shipping Discount</Span>
              <Span>$ -5.90</Span>
            </SummaryItem>
            <SummaryItem sx={{mb:1}}>
              <Span>Total</Span>
              <Span>$ 80</Span>
            </SummaryItem>
            <Button variant='outlined' sx={{ml:'6vw'}} >CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      
    </Box>
  );
};

export default Cart;