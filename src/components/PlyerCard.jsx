import { Card, CardMedia } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { getInfo } from '../../Api'
import PlayCircleTwoToneIcon from '@mui/icons-material/PlayCircleTwoTone';
import { NavLink, useParams } from 'react-router-dom';

export  function TvSlider({data, show, epShown}){

    const currentCardRef = useRef(null);

  // Function to scroll to the current card
  const scrollToCurrentCard = () => {
    if (currentCardRef?.current) {
      currentCardRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Call scrollToCurrentCard whenever epShown changes
  useEffect(() => {
    scrollToCurrentCard();
  }, []);





    const text = show?.title?.toUpperCase()

    return(
        <div className={` tv-slider rounded  absolute  p-[10px] w-full h-max flex flex-col bottom-36 justify-start ${epShown && "active"} `}>
            <h1 className=' text-[20px] ml-[5px] font-[600] '>{text}</h1>
        <div className= ' overflow-x-scroll gap-2 justify-evenly items-start flex'>
            <div>
                
            </div>
            {
                data?.map((ep, index) => (

                    <PlyerCard
                    ref={index === epShown ? currentCardRef : null} 
                    show = {show} key = {index} index = {index} episodes = {ep}  />
                    
                ))
            }
        </div>
        </div>
    )
}

function PlyerCard(props) {
    const [isShown, setIsShown] = useState(false)
    const params = useParams()


    const stringWithoutSpacesTv = props?.episodes?.episodeTitle?.replace(/:/g, '');
   
    useEffect(()=> {

    }, [props.episodes.episodeTitle])
   
  return (
    <div
    ref={props.ref}
   
    className={`tv_card  p-[10px] rounded-[6px] ${params.title === props.episodes.episodeTitle && "bg-gradient-to-b from-[#6b0000b9] to-transparent "  }`}>
          <div className="info">
            <h1 className=' text-[16px] font-[300]'>{props.episodes.episodeTitle}</h1>
            
        </div>
        <div className='  h-[150px] w-[250px] relative flex justify-center items-center  '
        onMouseEnter={()=> setIsShown(true)}
        onMouseLeave={()=> setIsShown(false)}
        >
            {params.title === props.episodes.episodeTitle && 
            <h1  className=' text-[14px] font-[500] absolute'>Now Playing</h1>}
       {  isShown && params.title !== props.episodes.episodeTitle && 
       
       <a  href={`/details/${props.show.id}/${stringWithoutSpacesTv}`} className=' absolute w-[60px] h-[60px]'>

           <PlayCircleTwoToneIcon  sx={{position : "absolute", width : "60px", height : "60px",}}/>
       </a>
        }
        <img 
        className=' rounded-[4px] w-full h-full object-cover '
        src={props.episodes.thump} alt="" />
        </div>

      
        
        
    </div>
  )
}

export default PlyerCard
