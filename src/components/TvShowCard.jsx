import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlayCircleTwoToneIcon from '@mui/icons-material/PlayCircleTwoTone';
import { Skeleton } from '@mui/material';

const formatDate = (timestamp) => {
  if (!timestamp) return ''; // Handle case where timestamp is undefined
  // Convert Firebase Timestamp to JavaScript Date object
  const date = timestamp.toDate();
  // Format date using toLocaleDateString() method
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

function TvShowCard({ data, index }) {
    const [isHovering, setIsHovering] = useState(false);
    const [imageMetadata, setImageMetadata] = useState(null);

   const handleImageLoad = (event) => {
       // Accessing metadata of the loaded image
       const { naturalWidth, naturalHeight } = event.target;
       setImageMetadata({ width: naturalWidth, height: naturalHeight });
   };

    

    if (!data) return null;

    const formattedDate = formatDate(data.releaseDate);

    return (
        <>

                {   

              
                    imageMetadata === null && 
                    <div className='w-full flex justify-center'>
                    <Skeleton variant="rounded"  animation = "wave"
                    sx={{  width : "100%", height : "180px", borderRadius : "24px", backgroundColor : "#8e8e8e24"  }} />
                    </div>
                }

            <div className={`flex items-center justify-around w-full p-[20px] h-[180px] rounded-3xl 
            ${imageMetadata === null && "hidden"} bg-[#8e8e8e3a] hover:bg-[#8e8e8e63] hover:transition-[0.2s] `}>
            
                <div className={`w-[25%] h-[200px] flex items-center gap-[40px] `}>
                    <h1 className='text-[30px] font-[600]'>{index + 1}</h1>
                    <Link 
                        to={data.episodeTitle}
                        onMouseEnter={()=> setIsHovering(true)}
                        onMouseLeave={()=> setIsHovering(false)}
                        style={{ display: "flex", position: "relative", justifyContent: "center", alignItems: "center" }}
                    >
                        <PlayCircleTwoToneIcon
                            sx={ isHovering ? { width: "60px", height: "60px", position: "absolute", transition: "0.2s", opacity: "1", cursor: "pointer" } 
                                           : { position: "absolute", width: "30px" , height: "30px", opacity: "0", cursor: "pointer" } 
                           }
                        />
                        <img 
                                className={`w-full h-full object-cover rounded-2xl `}
                                src={data.thump}
                                alt={data.episodeTitle} 
                                style={{height: '140px', width: '300px' }} // Add this style
                                onLoad={handleImageLoad}
                            />

                    </Link>
                </div>
                <div className='w-[60%]'>
                    <div className='flex w-full justify-between mb-2 items-center'>
                        <h1 className='text-[20px]'>{data.episodeTitle}</h1>
                        <h2 className='text-[12px] font-[200]'>{formattedDate}</h2>
                    </div>
                    <p className='w-full text-[16px] font-[200]'>{data.description}</p>
                </div>
            </div>
            {/* {imageMetadata && <div className="line bg-[grey] w-full h-[0.4px]" ></div> } */}
        </>
    );
}

export default TvShowCard;
