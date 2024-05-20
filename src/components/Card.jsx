import React, {useContext, useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import Button, {ButtonOutlined} from './Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { ArrowCircleDownOutlined, PlayArrow } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import PlayCircleFilledWhiteTwoToneIcon from '@mui/icons-material/PlayCircleFilledWhiteTwoTone';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import { db } from '../../Firebase';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ShowCard({data, animation}) {
  const [expanded, setExpanded] = React.useState(false);
  const [isPlaying, setIsPlaying ] = React.useState(false)
  const [videoTime, setVideoTime] = useState(false)
  const [videoMetaData, setVideoMetadata] = useState(null)

  const { opacity, transition, scale } = animation;



  const [userData, setUserData] = useState(null)


  useEffect(()=> {
    const fetchUserData = async () => {
    const userRef = doc(db, "users", currentUser.uid);
     const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
     setUserData(userSnap.data())
  }
    }

    fetchUserData()
  },[userData?.likedMovies])

 



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const stringWithoutSpaces = data?.title?.replace(/:/g, '');


  const currentUser = useContext(AuthContext)

  //update liked items array
  
  async function handleLiked() {
    try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const currentLikedMovies = userData.likedMovies || [];
            
            // Check if the data movie is already liked
            const isAlreadyLiked = currentLikedMovies.some(movie => movie.id === data.id);
            
            // If the data movie is not already liked, add it to the list
            if (!isAlreadyLiked) {
                const updatedLikedMovies = [...currentLikedMovies, data];
                
                await updateDoc(userDocRef, {
                    likedMovies: updatedLikedMovies
                });

                console.log("Liked movie added successfully.");
            } else {
                console.log("Movie is already liked.");
            }
        } else {
            console.log("User document does not exist.");
        }
    } catch (error) {
        console.error("Error updating liked movies:", error);
    }
}




  useEffect(()=> {
    setTimeout(()=> {
      setVideoTime(true)
    }, 2000)
  },[])


  const handleVideoLoadMetadata = (event) => {
    // Accessing metadata of the loaded video
    const { videoWidth, videoHeight } = event.target;
    setVideoMetadata({ width: videoWidth, height: videoHeight });


};

// console.log(userData?.likedMovies)

const isLiked = userData?.likedMovies.find( item => (item.id === data.id))




  return (
    <Card sx={{ maxWidth: "23%" , position : "absolute", 
    backgroundColor : "#323232", opacity, transition, scale }}>
        
        <div className='min-w-full min-h-full'>
  {videoTime ? (
    <div>
   { 
   
    <video autoPlay width="100%" height="100%"
    onLoadedMetadata={handleVideoLoadMetadata}
    >
      <source src={data.trailerVideo} type='video/mp4' />
    </video>
}
    </div>
  ) : (
    <CardMedia
      component="img"
      height="100%"
      width="100%"
      image={data?.coverImage}
    />
  )}
</div>





      <CardHeader
       
        title={data.title}
        titleTypographyProps={{
            style: {
                color: 'white',
                fontSize: '14px',
                maxHeight: '30px', // Set the maximum height
                overflow: 'hidden', // Hide any content that overflows the maximum height
                textOverflow: 'ellipsis', // Add ellipsis for overflowed text
                display: '-webkit-box', // Set the display mode to create a block-level box
                WebkitLineClamp: 1, // Set the number of lines you want to display before truncating
                WebkitBoxOrient: 'vertical', // Set the box orientation to vertical
            }
        }}
        
      />
    
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <div

          >

            {
              isLiked?.id === data?.id ? (
                <div className=' flex items-center justify-center gap-2 '>
                  <ThumbUpAltIcon   onClick = {handleLiked}  /> 
                  <p
                  className=' text-[15px]'
                  >Liked</p>

                </div>

              ) : (
                
                <ThumbUpOffAltIcon/>
              )
            }

          </div>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent 

            sx={{
                display : "flex",
                alignItems : "center",
                justifyContent : "space-between"
            }}
        >
        <Link
        className='flex items-center gap-2'
        to={`/details/${data.id}/${stringWithoutSpaces}`} >
            

                <PlayCircleFilledWhiteTwoToneIcon />
                 <p className=' text-[14px]'>Play</p>   

                </Link>

                <Link 
                to={`/details/${data?.id}`}
                className='flex items-center gap-2'
                >
                
                 <p className=' text-[14px]'>More Info</p>   
                  <ArrowCircleRightTwoToneIcon />
            
                </Link>

         
        </CardContent>
      </Collapse>
    </Card>
  );
}