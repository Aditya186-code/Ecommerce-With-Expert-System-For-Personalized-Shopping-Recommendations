import React,{Fragment,FC,PropsWithChildren} from 'react'
import DashboardSideBar from './Sidebar'
import {Box,styled} from '@mui/material'
import { Outlet } from "react-router-dom";
import DashboardNavbar from './Navbar'
import SearchProduct from './SearchProduct';
const Wrapper:FC = styled(Box)(({ theme }:any) => ({
    width: `calc(100% - 80px)`,
    maxWidth: 1200,
    margin: "auto",
    paddingLeft: 80,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: 0,
      paddingLeft: "2rem",
      paddingRight: "2rem",
    },
  }));
  
const Dashboard:FC<PropsWithChildren> = ({children}) => {
    const Wrapper = styled(Box)(({ theme }:any) => ({
        // width: `calc(100% - 80)`,
        width:'94.1vw',
        position:'absolute',
        top:'0',
        height:'120%',
        // maxWidth: 1200,
        backgroundColor:'#f3f4f9',
       
        
        paddingLeft: 80,
        [theme.breakpoints.down("md")]: {
          width: "100%",
          marginLeft: 0,
          paddingLeft: "2rem",
          paddingRight: "2rem",
        },
      }));
      
  return (
    <Fragment>
      <DashboardSideBar/>
       <Wrapper>
        <DashboardNavbar/>
        
        {children || <Outlet />}
       </Wrapper>
    </Fragment>
  )
}

export default Dashboard