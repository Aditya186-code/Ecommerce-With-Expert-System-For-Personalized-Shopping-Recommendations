import React,{Fragment,FC,useState} from 'react'
import Sidebar from './Sidebar'

import Navbar from './Navbar'
import Welcome from './Welcome';
import KeyboardDoubleArrowRightTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone';
import { Box, styled } from '@mui/material';
const ToggleIcon = styled(Box)(({ theme }:any) => ({
  width: 25,
  height: 3,
  margin: "5px",
  borderRadius: "10px",
  transition: "width 0.3s",
  backgroundColor: 'black',
}));




const Home:FC = () => {
  const [sidebar,setsidebar]=useState(false)
  return (
      <Box top={0} left={0} position={'absolute'} width='100vw' height='100vh' sx={{backgroundColor:'#cccccc'}}>
      {/* {!sidebar&&<Box sx={{cursor:'pointer',position:'absolute',top:'5.2vh',left:'1.2vw'}} fontSize='large' onClick={()=>setsidebar(!sidebar)}>
      
            <ToggleIcon />
            <ToggleIcon />
            <ToggleIcon />
          </Box>}
      {sidebar&&<Sidebar sidebar={sidebar} setsidebar={setsidebar}/>} */}
      <Welcome/>
      </Box>
  )
}

export default Home