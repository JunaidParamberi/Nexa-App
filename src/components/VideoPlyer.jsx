import React, {useEffect, useState, useRef} from 'react'
import { Link, useParams } from 'react-router-dom'
import { getInfo } from '../../Api'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReactPlayer from 'react-player'
import { CircularProgress, LinearProgress } from '@mui/material';
import Forward10Icon from '@mui/icons-material/Forward10';
import Replay10Icon from '@mui/icons-material/Replay10';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Spinner from './Spinner';
import ErrorPage from '../Pages/ErrorPage';
import { CircleLoader, MoonLoader } from 'react-spinners';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';


function VideoPlyer() {

    const params = useParams()
    const[data,setData]= useState()
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(false)
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const videoRef = useRef(null);  
    const progressRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [showControls, setShowControls] = useState(true);
    const screeRef = useRef(null)
    const [loading,setIsLoading] =useState(true)
    const [videoMetadata, setVideoMetadata] = useState(null);
    
    const handleVideoLoadMetadata = (event) => {
        // Accessing metadata of the loaded video
        const { videoWidth, videoHeight } = event.target;
        setVideoMetadata({ width: videoWidth, height: videoHeight });
    
        // Set isPlaying to true if video has metadata
        setIsPlaying(true);
    };

    useEffect(() => {
        let timeout;
        const handleMouseMove = () => {
            setShowControls(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setShowControls(false);
            }, 4000); // Hide controls after 4 seconds of inactivity
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener("click", handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('click', handleMouseMove);
            clearTimeout(timeout);
        };
    }, []);
    

    useEffect(()=> {
        const handleKeyDown = (event)=>{
            if(event.key === "ArrowLeft") {
                return handleReplay10()
            }

        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    },[])

    useEffect(()=> {
        const handleKeyDown = (event)=>{
            if(event.key === "ArrowRight") {
              return handleForward10()
            }

        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    },[])

    // useEffect(()=> {

    //     const desableRightClick = (event)=> {

    //     }

    // })

    const handleDesable = (event)=>{
        event.preventDefault();
    }


    
  

   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await getInfo();
                setData(info);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchData();
    }, []); // Empty dependency array to ensure effect runs only once on mount

    useEffect(() => {
        const handleTimeUpdate = () => {
            setCurrentTime(videoRef.current.currentTime);
            setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
        };
    
        // Update time every second
        const timeInterval = setInterval(() => {
            handleTimeUpdate();
        }, 1000);
    
        // Cleanup function
        return () => {
            clearInterval(timeInterval);
        };
    }, []);
    

    useEffect(() => {
        const handleTimeUpdate = () => {
            if (!isDragging && videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
                setDuration(videoRef.current.duration);
                const calculatedProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
                setProgress(calculatedProgress);
            }
        };
    
        const handleLoadedMetadata = () => {
            setDuration(videoRef.current.duration);
        };
    
        if (videoRef.current) {
            videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
            videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        }
    
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, [isDragging]);
    
    

    const handleDragStart = event => {
        setIsDragging(true);
        setDragStartX(event.clientX);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    const handleDrag = event => {
        if (isDragging) {
            const bounds = progressRef.current.getBoundingClientRect();
            const delta = event.clientX - dragStartX;
            const width = bounds.width;
            const percentageDelta = (delta / width) * 100;
            setDragStartX(event.clientX);
            setProgress(prevProgress => {
                let newProgress = prevProgress + percentageDelta;
                newProgress = Math.min(Math.max(newProgress, 0), 100); // Clamp progress between 0 and 100
                return newProgress;
            });
            const currentTime = (progress / 100) * videoRef.current.duration;
            videoRef.current.currentTime = currentTime;
        }
    };
    
    const handleProgressBarClick = event => {
        const bounds = progressRef.current.getBoundingClientRect();
        const clickX = event.clientX - bounds.left;
        const width = bounds.width;
        const clickPercentage = (clickX / width) * 100;
        setProgress(clickPercentage);
        const currentTime = (clickPercentage / 100) * videoRef.current.duration;
        videoRef.current.currentTime = currentTime;
    };
    
    // Inside your JSX
    


     // Toggle play/pause state
     const handleTogglePlay = () => {
        setIsPlaying(prevState => !prevState);

        if(isPlaying === true){
            videoRef.current.play()
        } else{
            videoRef.current.pause()
        }
        
    };


    const formatTime = timeInSeconds => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    
    if(loading){
        return <Spinner/>
    }

    

    // Render loading state if data is not yet fetched
    if (!data) {
        return <div>Video Not Found</div>;
    }
    
    
    
    // Filter the Movies array based on the id parameter
    const filteredMovie = data?.Movies?.find(movie => movie.id === params.id);
    const filteredTvshows = data?.tvShows?.find(tv => tv.id === params.id)

    const episodeFilter = filteredTvshows?.ep?.find(tv =>tv.episodeTitle === params.title)

    
 
    const handleFullscreenToggle = () => {
        if (!isFullScreen) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if (videoRef.current.mozRequestFullScreen) { /* Firefox */
                videoRef.current.mozRequestFullScreen();
            } else if (videoRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                videoRef.current.webkitRequestFullscreen();
            } else if (videoRef.current.msRequestFullscreen) { /* IE/Edge */
                videoRef.current.msRequestFullscreen();
            }
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
            setIsFullScreen(false);
        }
    };





    
    const handleReplay10 = () => {
        if (videoRef.current.currentTime - 10 >= 0) {
            videoRef.current.currentTime -= 10;
        } else {
            videoRef.current.currentTime = 0;
        }
    };


    
    const handleForward10 = () => {
        if (videoRef.current.currentTime + 10 <= videoRef.current.duration) {
            videoRef.current.currentTime += 10;
        } else {
            videoRef.current.currentTime = videoRef.current.duration;
        }
    };


    

    
    const stringWithoutSpaces = filteredMovie?.title?.replace(/:/g, '');
    const stringWithoutSpacesTv = episodeFilter?.episodeTitle?.replace(/:/g, '');

    const check = filteredMovie ? !filteredMovie?.fullVideo : !episodeFilter?.fullVideo 


    if (check) {
        return <ErrorPage message = "Video Not Found"/>
    } 
    

   

  return (
    <>



 
      
      {videoMetadata === null &&   
      <div className='w-full h-[100vh] absolute top-0 flex justify-center items-center z-[100] bg-black'>
            <div className='w-full h-[100vh] flex justify-center items-center ' >
            <MoonLoader  color='red'/>
            </div>
        </div>}


    {params.title === stringWithoutSpaces ||  stringWithoutSpacesTv ? 
    <div className={`w-full h-[100vh] flex absolute top-0 z-50 bg-black ${videoMetadata === null && "hidden"} `}
        ref={screeRef}
   
    >
         
       { 
        showControls && 
       <div 
       onContextMenu={handleDesable}
       className=" full-controll w-full h-[100vh] flex flex-col px-[20px] py-[20px] 
       bg-gradient-to-b from-black via-transparent to-black ">
            
            <div className='w-full' >
               <Link to=".." relative='path'>
               <ArrowBackIcon fontSize='large'/>
               </Link> 
            </div>

            <div className='w-full h-full flex justify-center items-center'>

          { isPlaying? 
             <PlayCircleOutlineIcon sx={{width : "100px", height : "100px",cursor : "pointer"
             }}
             onClick={handleTogglePlay}
              />
             :
              <PauseCircleOutlineIcon sx={{width : "100px", height : "100px", cursor : "pointer"
             }}
             onClick={handleTogglePlay}
             />}
             
             
              </div>
             <div className="controlls h-[20%] flex flex-col gap-[10px]">
             <LinearProgress 
             variant="determinate"
             value={progress}
             color="error"
             ref={progressRef}
             onMouseDown={handleDragStart}
             onMouseUp={handleDragEnd}
             onMouseMove={handleDrag}
             onMouseLeave={handleDragEnd}
             onClick={handleProgressBarClick} // Add onClick event handler for clicking on the progress bar
             sx={{height : "4px", borderRadius : "5px", cursor : "pointer", backgroundColor : "lightgrey"}} />

             <div className='timing flex w-full justify-between'>
             <p>{formatTime(currentTime)}</p>
             <p>-{formatTime(duration - currentTime)}</p>
             </div>
         
             

             <div  className='flex justify-between items-center'>

                <div className='flex gap-[10px] mt-[20px]'>
                <div>
                <Replay10Icon
                className=' active:rotate-[-12deg]'
                 sx={{height : "50px", width : "50px", cursor : "pointer"}} 
                 onClick ={handleReplay10}
                 />
                </div>
               <div className=' active:rotate-12'>

         
                <Forward10Icon 
                sx={{height : "50px", width : "50px", cursor : "pointer"}} 
                onClick = {handleForward10}
                />

                </div>

               {
                   isMuted ? <VolumeOffIcon 
                   sx={{height : "50px", width : "50px", cursor : "pointer"}}
                   onClick = {()=> setIsMuted(false)}
                   /> 
                   :
                   <VolumeUpIcon 
                   sx={{height : "50px", width : "50px", cursor : "pointer"}}
                   onClick = {()=> setIsMuted(true)}
                   />
                   
                }
                </div>

                <div className=' flex'>
                    <div className='flex gap-3 mr-[40px]'>
                        <SkipPreviousIcon sx={{height : "50px", width : "50px", cursor : "pointer"}} />
                        <SkipNextIcon sx={{height : "50px", width : "50px", cursor : "pointer"}} />
                    </div>
                    {!isFullScreen ? <FullscreenIcon
                      sx={{height : "50px", width : "50px", cursor : "pointer"}}
                      onClick = {handleFullscreenToggle}
                    />
                    :
                    <FullscreenExitIcon
                      sx={{height : "50px", width : "50px", cursor : "pointer"}}
                      onClick = {handleFullscreenToggle}
                    />}
                </div>
            
             </div>
             </div>

             

        </div>}
      <video
        ref={videoRef}
        muted = {isMuted}
        onLoadedMetadata={handleVideoLoadMetadata}
        
        
    //    key={isPlaying ? 'play' : 'pause'} // Add key to force re-render when isPlaying changes
       
       
       className= {`custom-video w-full h-[100vh] absolute top-0 bottom-0 flex z-[-1] `} >
            <source src={filteredMovie?.fullVideo || episodeFilter?.fullVideo} type="video/mp4" />
            <source src={filteredMovie?.fullVideo || episodeFilter?.fullVideo} type="video/mkv" />
            <source src={filteredMovie?.fullVideo || episodeFilter?.fullVideo} type="video/x-matroska" />
            Your browser does not support the video tag.
            </video>
    </div>
 :    

 <ErrorPage/>
}
    </>
  )
}

export default VideoPlyer
