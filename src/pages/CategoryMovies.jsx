
import { useEffect, useState } from "react";
import Header from "../Components/Common/Header"
import { Box,Typography,styled,Divider } from "@mui/material"
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { getCategoryMovies } from "../service/api";
import { useLocation } from "react-router-dom";
import { POPULAR_API_URL, TOPRATED_API_URL, UPCOMING_API_URL, movieTypes } from "../constant/Constant";
import MoviesList from "../Components/MoviesList";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const StyledBanner = styled('img')({
 height:450,
 width:"100%"
});

const Component = styled(Box)`
width: 80%;
margin:auto;
`;
const Container = styled(Box)`
background:#f5f5f5;
padding: 10px;`

const CategoryMovies = () => {

    const [movies,setMovies] = useState([]);
    const {search}= useLocation();
    useEffect(()=>{
        
        let API_URL;

        if(search.includes('popular')){
            API_URL = POPULAR_API_URL;
        }else if(search.includes('upcoming')){
            API_URL = UPCOMING_API_URL;
        }else if(search.includes('toprated')){
            API_URL = TOPRATED_API_URL;
        }

        const getData = async(API_URL) =>{
            let response = await getCategoryMovies(API_URL);
            setMovies(response.results);
        }

        getData(API_URL);
    },[search]);
  return (
    <>
    <Header/>
    <Component>
    <Carousel
    swipeable={false}
    draggable={false}
    responsive={responsive}
    infinite={true}
    autoPlay={true}
    autoPlaySpeed={3000}
    keyBoardControl={true}
    showDots={false}
    slidesToSlide={1}
    containerClass="react-multi-carousel-list"
    dotListClass="custom-dot-list-style"
    itemClass="carousel-item-padding-40-px"
    style={{ overflow: 'visible' }}
>
    {movies.map((movie, index) => (
        <>
            <StyledBanner key={index} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="movie" />
            {/* <Title>{movie.original_title}</Title> */}
        </>
    ))}
    </Carousel>
    <Container>
        <Typography variant="h6">
            TMDb Charts
        </Typography>
        <Typography variant="h4">
           IMDb {movieTypes[search.split('=')[1]]} Movies
        </Typography>
        <Typography style={{fontSize:12,margin:5}}>
            IMDb Top {movies.length} as rated by regular IMDb voters.
        </Typography>
        <Divider/>
        <MoviesList movies={movies}/>
    </Container>


    </Component>
      
    </>
  )
}

export default CategoryMovies
