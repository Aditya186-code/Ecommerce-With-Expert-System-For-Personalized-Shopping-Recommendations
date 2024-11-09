import React from 'react'
import { Box,Card,Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import Shop2OutlinedIcon from '@mui/icons-material/Shop2Outlined';
const Welcome = () => {
  return (
    // <Box width='100%' height='100%'>
    <Box position={'absolute'} top={-2} left={'10vw'}>
        <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'1.5rem',paddingBottom:'1.5rem'}} >
        <div>
          <img src='newpop.png' alt='photu' style={{marginTop:'1vh',width:'5vw'}} />
        </div>
        <ul style={{ position:'relative',right:'35vw',display:'flex',justifyContent:'center',alignItems:'center',listStyleType:'none'}}>
          
            <li style={{margin:'0 5vw'}}>
              <Link style={{textDecoration:'none',color:'white',fontFamily:'"Poppins",sans-serif'}} to="/sell">Start Selling</Link>
            </li>
         
            <li style={{margin:'0 3vw'}}>
              <button style={{color:'#fff',borderRadius: '10vh',
  backgroundColor: '#2c2d2d',width:'6vw',height:'4vh'}}>
                <Link style={{textDecoration:'none',color:'white',fontFamily:'"Poppins",sans-serif'}} to="/dashboard">Dashboard</Link>
              </button>
            </li>
          
            {/* <li>
              <button style={{color:'#fff',borderRadius: '10vh',
  backgroundColor: '#2c2d2d',width:'5vw',fontFamily:'"Poppins",sans-serif'}}>
                <Link style={{textDecoration:'none',color:'white'}} to="/user">Profile</Link>
              </button>
            </li> */}
          
        </ul>
      </nav>
      <section style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        

        <div className="hero-text" style={{marginBottom:'2rem',width:'30%',color:'#2c2d2d',marginTop:'5vh',fontFamily:'"Poppins",sans-serif'}}>
          <h2>Personalized Shopping with Ecommerce</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab aperiam eos perspiciatis nihil optio ut alias vero incidunt porro facere quis, mollitia quaerat. Possimus molestiae architecto rem saepe ab labore!
          </p>
        </div>

        <Box display={'flex'} ml={'3vw'}>
          <NumText num="200k" text="User" />
          <NumText num="70k" text="Seller" />
          <NumText num="180k" text="Buyer" />
        </Box>
        
        <Box sx={{marginTop: '10vh',
  marginLeft: '4vw',
  width: '80%'}}>
          <img src='apple.png' alt="Hello" placeholder="tech" />
        </Box>
      </section>
      <div className="hero-buttons">
        <button
          style={{
            marginLeft: "20vw",
            borderRadius: "10vh",
            backgroundColor: "#2C2D2D",
            textDecoration: "none",fontFamily:'"Poppins",sans-serif'
          }}
          
        >
          <Link style={{color:'white',textDecoration:'none'}} to="/shop">Start Shopping</Link>
        </button>
      </div>
    </Box>
  );
};

const NumText = ({ num, text }:any) => {
  return (
    <Box sx={{mr:'2vw'}}>
      <h2 style={{ color: "#2c2d2d" }}>{num}</h2>
      <p style={{ color: "#2c2d2d" }}>{text}</p>
    </Box>
  );
};
    // </Box>
 

export default Welcome