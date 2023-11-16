

import { useEffect, useState } from "react"
import Header from "../Components/Common/Header"
import { getCategoryMovies } from "../service/api";
import { NOWPLAYING_API_URL } from "../constant/Constant";
import { Box,styled } from "@mui/material";
import Banner from "../Components/Banner";
import UpNext from "../Components/UpNext";
import Slide from "../Components/Slide";

const Wrapper = styled(Box)`
display:flex;
padding:20px 0;
`;

const Component =  styled(Box)`
padding: 0 115px;

`

const Home = () => {

  const [movies,setMovies] = useState([])
  useEffect(() => {
    const getData = async () => {
        let response = await getCategoryMovies(NOWPLAYING_API_URL);
        setMovies(response.results);    
    }
    getData();
}, [])
  return (
    <>
    <Header/>
    <Component>
      <Wrapper>
        <Banner movies={movies}/>
        <UpNext movies={movies}/>
      </Wrapper>
      <Slide movies={movies}/>
      <Slide movies={movies}/>
      <Slide movies={movies}/>
      <Slide movies={movies}/>
      <Slide movies={movies}/>
    </Component>  
    </>
  )
}

export default Home
