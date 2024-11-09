import SearchInput from 'components/SearchInput'
import { Button,Box } from '@mui/material'
import React,{FC,useState} from 'react'

const SearchProduct :FC = () => {
    const [search,setsearch]=useState('')
  return (
    <Box display='flex' sx={{ml:'60vw'}}>
    <Button sx={{borderRadius:'10vh',mr:'1vw',height:'5vh',mt:'0.5vh'}}color='primary' variant='contained'>Search</Button>
    <SearchInput placeholder='Search Product' value={search} onChange={(e)=>setsearch(e.target.value)}/>
    </Box>
  )
}

export default SearchProduct