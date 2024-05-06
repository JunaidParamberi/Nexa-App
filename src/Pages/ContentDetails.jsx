import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getInfo } from '../../Api';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import play from '../assets/play-button.svg'
import TvShowCard from '../components/TvShowCard';
import { Skeleton } from '@mui/material';

const ContentDetails = () => {
    const params = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [imageMetadata, setImageMetadata] = useState(null);
    const [logoMetaData, setLogoMetaData] = useState(null)



    const handleImageLoad = (event) => {
        // Accessing metadata of the loaded image
        const { naturalWidth, naturalHeight } = event.target;
        setImageMetadata({ width: naturalWidth, height: naturalHeight });
    };

    const handleLogoLoad = (event) => {
        // Accessing metadata of the loaded image
        const { naturalWidth, naturalHeight } = event.target;
        setLogoMetaData({ width: naturalWidth, height: naturalHeight });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await getInfo();
                setData(info);
            } catch (error) {
                console.error('Error fetching data:', error);
            }finally{
                setLoading(false)
            }
        };

        fetchData();
    }, []); // Empty dependency array to ensure effect runs only once on mount
    
    if(loading){
        return <Spinner/>
    }

    // Render loading state if data is not yet fetched
    if (!data) {
        return null;
    }

    
    const obj = Object.entries(data)

    // Filter the Movies array based on the id parameter
    const filteredMovie = data.Movies?.find(movie => movie.id === params.id)
    const filteredTvshows = data.tvShows?.find(movie => movie.id === params.id)


    const stringWithoutSpaces = filteredMovie?.title?.replace(/:/g, '');
    // const stringWithoutSpacesTv = filteredTvshows?.ep[0].episodeTitle(/:/g, '');



    return (
        <>
        {
            (filteredMovie || filteredTvshows) && (
        <div className='w-full flex flex-col min-h-[100vh] justify-center'>

              {/* {
            imageMetadata === null &&
          
            <Skeleton variant="rectangular" animation = "wave" 
            sx={{  width : "100%", height : "70vh",position : "absolute", zIndex: "-0", 
              borderRadius : "30px", backgroundColor : "#8e8e8e24", top : "0px"  }} />
             
             
            } */}

            
            <div>
                <div className='w-full h-[70vh] bg-gradient-to-b from-transparent to-black min-h-[70vh] absolute z-[-1]'></div>
                <img src={filteredMovie?.coverImage || filteredTvshows?.coverImage} 
                    alt="cover-static"
                    className={`w-full object-cover bg-cover h-[70vh] top-0 absolute z-[-2] ${imageMetadata === null &&  "hidden"}`}
                    onLoad={handleImageLoad}
                />
            </div>

            <div className="contet-details flex justify-center ">
                <div className='w-[80%] flex flex-col pt-[40vh]' >
                    <div className='w-[30%] flex flex-col justify-center items-start gap-5'>
                        <img src={filteredMovie?.movieLogo || filteredTvshows?.movieLogo} 
                            className='max-w-full max-h-full'
                            alt="movie-name"
                        />

                        <div className=' font-[400] text-[16px] flex gap-2 '>
                            {/* genre */}
                            {(filteredMovie || filteredTvshows)?.genre.map((gen, index) => (
                                <React.Fragment key={index}>
                                    <h2>{gen} |</h2>
                                </React.Fragment>
                            ))}
                            {/* length */}
                            <h2>
                                {filteredMovie?.duration ? (
                                    // If filteredMovie.duration exists, render it
                                    filteredMovie.duration
                                ) : (
                                    // Otherwise, render the seasons of the TV show
                                    `Seasons: ${filteredTvshows?.seasons}`
                                )}
                            </h2>
                        </div>
                        <Link to={stringWithoutSpaces || filteredTvshows.ep[0].episodeTitle }>
                            <Button 
                                text="Watch Now"
                                img={play}
                            />
                        </Link>
                    </div>
                    <p className=' mt-[50px] w-full text-[16px] font-[300]'>
                        {filteredMovie?.description || filteredTvshows?.description}
                    </p>
                </div>
            </div>
            <div className=' mt-[30px] w-full flex flex-col justify-start items-center gap-5 '>

           { filteredTvshows &&
           filteredTvshows?.ep.map((episode, index) => (
            <div
            key={index}
             className='w-[80%]'>

            <TvShowCard index= {index} data = {episode}/>

            </div>

           )) }

            </div>
        </div>
    )
}
            
        </>
    );
};

export default ContentDetails;
