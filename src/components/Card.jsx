import * as React from 'react';
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

  const { opacity, transition, scale } = animation;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const stringWithoutSpaces = data?.title?.replace(/:/g, '');


  const StyledCard = styled(Card)(({ theme }) => ({
    
    maxWidth: '20%',
    position: 'absolute',
    opacity: '0',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    transform: 'scale(0.7)',
    backgroundColor: '#323232',
    borderRadius: '15px', // Set the border radius here
    '&:hover': {
      opacity: '1',
      transform: 'scale(1)',
   
    },
  }));
  
 

  return (
    <StyledCard>
        
    <div>

      

        <CardMedia
        component="img"
        height="100"
        image= {data?.coverImage}
    
        
      />

        
      

    </div>




      <CardHeader
       
        title={data?.title}
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
          <FavoriteIcon />
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

        </ExpandMore>
      </CardActions>
   
        <CardContent 

            sx={{
                display : "flex",
                alignItems : "center",
                justifyContent : "space-between"
            }}
        >
        <Link
        className='flex items-center gap-2'
        to={`/details/${data?.id}/${stringWithoutSpaces}`} >
            

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

    </StyledCard>
  );
}