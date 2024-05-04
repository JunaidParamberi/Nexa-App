import React,{useState, useEffect, useRef} from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import Button, { ButtonOutlined } from './Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { getInfo } from '../../Api';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Link } from 'react-router-dom';
import { Skeleton, Typography } from '@mui/material';
import Spinner from './Spinner';
import { PuffLoader } from 'react-spinners';




function Hero() {



    const [data, setData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying,setIsPlaying] = useState(false)
    const videoRef = useRef(null)
    const [isMuted, setIsMuted] = useState(true)
    const [loading, setLoading] = useState(true)
    const  [er, setEr] = useState (false)
    const [imageMetadata, setImageMetadata] = useState(null);
    const [logoimageMetadata, setLogoImageMetadata] = useState(null);
    const [allData, setSallData] = useState(null)



    

    // Function to handle onLoad event of the image
    const handleImageLoad = (event) => {
       // Accessing metadata of the loaded image
       const { naturalWidth, naturalHeight } = event.target;
       setImageMetadata({ width: naturalWidth, height: naturalHeight });
   };
    const handleLogoImageLoad = (event) => {
       // Accessing metadata of the loaded image
       const { naturalWidth, naturalHeight } = event.target;
       setLogoImageMetadata({ width: naturalWidth, height: naturalHeight });
   };



        const handlePlay = ()=> {
            setIsPlaying(true)
           
        }


        useEffect(() => {
            const fetchData = async () => {
                try {
                    const info = await getInfo();
                    setData(info.Movies);
                    setSallData(info)
                    setEr(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setEr(true);
                } finally {
                    setLoading(false); // Set loading state back to false when data fetching completes
                }
            };
        
            fetchData();
        }, []); // Empty dependency array to ensure effect runs only once on mount
        

    

    useEffect(() => {
        if (isPlaying === false) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex =>
                    prevIndex === data?.length - 1 ? 0 : prevIndex + 1
                );
            }, 5000); // 10 seconds interval
    
            return () => clearInterval(interval);
        }
    }, [isPlaying, data]);
    

    // Render loading state if data is not yet fetched
    if (loading) {
        return <Spinner/>
    }

    if(!data){
        return null;
    }

    
    const currentItem = data[currentIndex];
    const tvCurrentItem = allData.tvShows[currentIndex];


    


    const stringWithoutSpaces = currentItem?.title?.replace(/:/g, '');


  
    

  return (
    <div
    
    className='hero-container 
     flex justify-center items-center 
    w-full bg-gradient-to-b from-transparent to-black min-h-[70vh]
     '

     onMouseEnter={handlePlay}
     onMouseLeave={()=> setIsPlaying(false)}
     
     >

        {
            imageMetadata === null &&
          
            <Skeleton variant="rectangular" animation = "wave" 
            sx={{  width : "95%", height : "70vh",position : "absolute", zIndex: "-0", 
              borderRadius : "30px", backgroundColor : "#8e8e8e24", top : "0px"  }} />
             
             
        }

      

          {isPlaying && 
          <video  autoPlay muted = {isMuted}
          className={`w-full object-cover bg-cover h-[70vh] top-0 absolute z-[-1] ${imageMetadata === null && "hidden"}`}
          >
              <source 
              onLoad={handleImageLoad}
              src={currentItem?.trailerVideo} type="video/mp4" />
              
            </video> }
     

        

       {


       <img src={currentItem?.coverImage} 
        alt="cover-static"
        className={`w-full object-cover bg-cover top-0 h-[70vh] absolute z-[-2] ${imageMetadata === null && "hidden"} `}
        onLoad={handleImageLoad}
        />
     
    }

  
{logoimageMetadata === null &&  
    <div className= "contet-details w-[80%] flex flex-col items-center gap-3 pt-[100px] justify-center" >
    <div className='w-[500px] min-h-[200px] bg-cover flex justify-center items-center relative '>        
        <Skeleton 
            variant="rectangular" 
            animation="wave" 
            sx={{  
                minWidth : "70%", 
                minHeight : "200px",
                borderRadius : "40px", 
                objectFit : "contain",

            }} 
        />      
        </div> 
        <Skeleton 
            variant="text" 
            animation="wave" 
            sx={{  
                width : "20%",
                fontSize : "16px",
            }} 
        />  
    
        <Typography sx ={{
            width : "40%"
        }} variant="p"> 
        <Skeleton /> 
        <Skeleton /> 
        </Typography>    

        <div className=' flex w-[50%] justify-center items-center gap-4'>
        <Skeleton 
            variant="rectangular" 
            animation="wave" 
            sx={{  
                width : "20%",
                height : "40px",
                borderRadius : "20px", 

            }} 
        /> 
        <Skeleton 
  variant="rectangular" 
            animation="wave" 
            sx={{  
                width : "20%",
                height : "40px",
                borderRadius : "20px", 
            }} 
        /> 
        </div>
        </div>
    }

      

      <div className={` contet-details w-[80%] flex flex-col items-center gap-3 pt-[100px] 
      ${logoimageMetadata === null && "hidden"} `} >

   

            {/* content name or logo */}
            <div className='w-[500px] min-h-[200px] bg-cover flex justify-center items-center relative'>

     
  
    <img 
        src={currentItem?.movieLogo} 
        className={`max-w-[70%] max-h-[70%] object-contain  ${logoimageMetadata === null && "hidden"}`}
        alt="movie-name"
        onLoad={handleLogoImageLoad}
    />
</div>



            {/* catogary */}
            <div className=' font-[400] text-[16px] flex gap-2 '>
            {/* genre */}
            {currentItem?.genre.map((gen, index) => (
                 <React.Fragment 
                 key={index}>
                  <h2 >{gen} |</h2>
                 {/* {index !== currentItem.genre.length - 1 && <span>|</span>} */}
                </React.Fragment>
))}

            {/* length */}
            
            <h2>{currentItem?.duration}</h2>
            </div>
            
            <p className=' max-w-[50%] text-center font-[100] text-[16px]'>
              {currentItem?.description}
            </p>

            <div className="buttons flex gap-5 mt-[20px]">
                <Link to={`/details/${currentItem.id}/${stringWithoutSpaces}`} >
                
                <Button 
                text="Watch Now"

                img={"src/assets/play-button.svg"}
                
                />
                </Link>

                <Link to={`/details/${currentItem?.id}`} >
                
                <ButtonOutlined 
                text="More Info"

                icon={<ArrowCircleRightIcon fontSize='small'/>}
                />
                </Link>
            </div>

            <div className='w-full h-[60px] flex justify-end'>
               {isPlaying &&  <div className=' border-[1px] border-[#ffffff6f] rounded-full w-[40px] h-[40px] p-[5px] cursor-pointer
                flex justify-center items-center hover:bg-[white] hover:bg-opacity-[0.2]'
                onClick={()=> setIsMuted(prevState => !prevState)}
                >
                {isMuted ? <VolumeOffIcon fontSize='small'/>  :  <VolumeUpIcon fontSize='small'  />}

                </div>}
            </div>
      </div>
    </div>
  )
}

export default Hero
