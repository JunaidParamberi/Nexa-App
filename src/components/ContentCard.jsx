import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';


function ContentCard({ data, loading, onMouseEnter, onMouseLeave }) {
    const [imageMetadata, setImageMetadata] = useState(null);




    

     // Function to handle onLoad event of the image
     const handleImageLoad = (event) => {
        // Accessing metadata of the loaded image
        const { naturalWidth, naturalHeight } = event.target;
        setImageMetadata({ width: naturalWidth, height: naturalHeight });
    };

    if (!data) {
      return <div>No Data Found</div>;
  }


 
    

    return (
        <div className=' w-full h-full'>
        {
            imageMetadata === null &&
          
            <Skeleton variant="rectangular" animation = "wave" 
            sx={{  width : "100%", height : "100%", borderRadius : "8px", backgroundColor : "#8e8e8e24"  }} />
             
             
        }


       { <Link
        // style={imageMetadata === null && {display : "none"} }
      
        to={`/details/${data.id}`} >
            <img 
            className={`w-full h-full object-cover bg-cover rounded-lg ${imageMetadata === null && "hidden" }`} 
            src={data.coverImage} alt=""
            onMouseEnter = {onMouseEnter}
            onMouseLeave = {onMouseLeave}
            onLoad={handleImageLoad}
            />
        </Link>
}
        </div>
    );
}

export default ContentCard;
