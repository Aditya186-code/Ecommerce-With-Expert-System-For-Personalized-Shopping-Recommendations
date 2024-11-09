import { Box, Card, Typography, styled,Rating, Button } from '@mui/material'
import { H1, H3, H4,Small } from 'components/Typography'
import React,{FC, Fragment,useEffect,useState} from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import FlexBox from 'components/FlexBox';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useTitle from 'hooks/useTitle'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { test_private } from '../khaltikey';
import useAuth from "hooks/useAuth";

import { Swiper, SwiperSlide } from 'swiper/react';
import { productList } from './ProductList'
import { useNavigate, useParams } from 'react-router';
import { TypeSpecimenOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CART, Add2Cart } from 'redux/cartReducer';
import axios from 'axios';
import { getProduct, getRecProduct, selectCRecproduct,selectIRecproduct, selectElecproduct, selectProduct } from 'redux/productReducer';


const ViewProductWrapper=styled(Box)(()=>({
    display:'flex',
    
    marginTop:'2vh',
    justifyContent:'center',
    textAlign:'center',
    width:'85vw',
    marginLeft:'auto',
    marginRight:'auto'
}))

const ViewProduct:FC = () => {
  // const [product,setproduct]=useState(Object)
  // const[rec,setrec]=useState(Array)
  // const[pid,setpid]=useState(String)
  
  const dispatch=useDispatch<any>()
  const { logout, user } = useAuth();
  const product=useSelector(selectProduct)
  const rec=useSelector(selectCRecproduct)
  const irec=useSelector(selectIRecproduct)
  
  const {id}:any=useParams()
  
  
  const navigate=useNavigate()
  const handlePayment=async(x:any)=>{
    
   
   
    const data_raw={
      "amount": Math.ceil(product.discounted_price*120),
      "failure_url": "https://google.com",
      "product_delivery_charge": 0,
      "product_service_charge": 0,
      "product_code": "EPAYTEST",
      
      "signed_field_names": "total_amount,transaction_uuid,product_code",
      "success_url": `http://localhost:3000/dashboard/view-product/${id}`,
      "tax_amount": 0,
      "total_amount":Math.ceil(product.discounted_price*120),
      "transaction_uuid": crypto.randomUUID()
      }
  const newt:any=await axios.post('http://localhost:8000/api/payment/initiate',data_raw)
  const newP=newt.data
  
  console.log(newP)
  var form=document.createElement('form')
   form.setAttribute('method',"POST")
   form.setAttribute('action',"https://rc-epay.esewa.com.np/api/epay/main/v2/form")

   for(var key in newP){
    var hiddenfield=document.createElement('input')
    hiddenfield.setAttribute('type','text')
    
    hiddenfield.setAttribute('id',key)
    hiddenfield.setAttribute('name',key)
    hiddenfield.setAttribute('value',newP[key])
    hiddenfield.required=true
    form.appendChild(hiddenfield)
   }
   
   document.body.appendChild(form)
   form.submit()
    }
    
useEffect(()=>{
 dispatch(getProduct(id))
 dispatch(getRecProduct(id))
},[dispatch,id])
    useTitle("View Product")
    const handleCart=()=>{
    dispatch(Add2Cart(product))
    }
  
    const handleView=(id:number)=>{
      navigate(`/dashboard/view-product/${id}`)
    } 
  const rec_index=Math.floor(Math.random()*(rec.length-5))
  
  const new_rec=rec.slice(rec_index,rec_index+5)
  
  return (
    <>
    <ViewProductWrapper>
    <Box mr='2vw' marginTop={'auto'} marginBottom={'auto'}>
        <img style={{width:'16vw',height:'30vh'}} src={product.img_link} placeholder='imgs' alt='imgs'/>
    </Box>
    <Card sx={{display:'block',padding:'2vh',maxHeight:'105vh',marginRight:'5vw', borderRadius:'3vh',maxWidth:'45vw'}}>
        <H1 color={(theme)=>theme.palette.primary.main}>{product.product_name}</H1>
        <Box textAlign={'left'} mt='1vw'>

        <Typography color={(theme)=>theme.palette.primary.main}>Company : Amazon</Typography>
        <Typography mt={'1vw'} color={(theme)=>theme.palette.primary.main}>Actual Price: Rs {product.discounted_price*120}</Typography>
        <Typography mt={'1vw'} color={(theme)=>theme.palette.primary.main}>Discounted Price: Rs {product.discounted_price*120}</Typography>
        </Box>
        <Box display={'flex'} mt={'1vw'}>
            <Typography color={(theme)=>theme.palette.primary.main}>Rating</Typography>
        <Rating 
              name="read-only"
              size="small"
              defaultValue={product.ratings}
              readOnly
              sx={{ my: "3px" }}
              />
              <Typography ml='1vw'>{product.ratings}</Typography>
        </Box>
        <Typography mt={'2vw'} color={(theme)=>theme.palette.primary.main}>Description:</Typography>
        <Typography>{product.about_product}</Typography>
        <Box mt={'5vh'} p='0.5vw' sx={{color:'white'}}>

        <Button sx={{backgroundColor:'black',mr:'1vw',cursor:'pointer'}} onClick={handleCart}><AddShoppingCartIcon fontSize='small' sx={{float:'left'}}/> Add to Cart</Button>
        <Button sx={{backgroundColor:'skyblue',cursor:'pointer'}}
         onClick={(product)=>handlePayment(product)}
         ><CreditCardIcon fontSize='small'/> Order Now</Button>
        </Box>

    </Card>
    <Card sx={{ padding: "1rem", height: "100%",maxWidth:'20vw',borderRadius:'3vh' }}>
        <H3 >Similar Contents</H3>
       
      

        {new_rec.map((produc:any, index:number) => (
            
          
          
          
          <FlexBox key={index} mt="5vh" onClick={()=>handleView(produc.product_id)} sx={{cursor:'pointer'}} >
          <span style={{maxWidth:'85px',maxHeight:'40px'}}><img src={produc.img_link} alt="Men Keds"  width="80px" height='60px' /></span>

          <Box display="flex" flexDirection={'column'} ml="1rem" mr='1vw'>
            <Small>{produc.brand}</Small>
            <Rating color='white'
              name="read-only"
              size="small"
              defaultValue={produc.ratings}
              readOnly
              sx={{ my: "3px" }}
              />
            <Small fontWeight={600}>Rs {produc.discounted_price}</Small>
          </Box>
        </FlexBox>
             
      )
      )}
       
      
        
    </Card>
    
    </ViewProductWrapper>
       <Box marginLeft='10vw' mt='5vh'>
        <H3>Similar Users also liked</H3>
    <Card sx={{ height: "15vh",width:'60vw',borderRadius:'3vh',display:'flex', backgroundColor:'#cccccc' }}>
       
      

        {irec.slice(0,4).map((product:any, index:any) => (
          
          
          
          
          <FlexBox key={index} mt="4vh" ml='0.5vw' style={{cursor:'pointer'}}onClick={()=>handleView(product.product_id)} >
            <span style={{maxWidth:'85px',maxHeight:'70px'}}><img src={product.img_link} alt="Men Keds"  width="80px" height='60px' /></span>

          <Box display="flex" flexDirection={'column'} ml="1rem" mr='2vw'>
            <Small>{product.title}</Small>
            <Rating
              name="read-only"
              size="small"
              defaultValue={product.ratings}
              readOnly
              sx={{ my: "3px" }}
              />
            <Small fontWeight={600}>$ {Math.ceil(product.discounted_price*120)}</Small>
          
          </Box>
        </FlexBox>
             
             )
             )}
       
      
        
    </Card>
             </Box>

      </>
  )
}

export default ViewProduct