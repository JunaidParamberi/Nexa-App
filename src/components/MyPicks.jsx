import React, { useState, useEffect, useContext } from 'react';

import ContentCard from './ContentCard';
import { getInfo, getUser } from '../../Api';
import { db } from '../../Firebase';
import { doc, getDoc } from "firebase/firestore";
import Spinner from './Spinner';
import ShowCard from './Card';
import { Skeleton } from '@mui/material';
import { AuthContext } from '../context/AuthContext';




function MyPicks() {
    
    const [data, setData] = useState(null);
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [hoveredCard, setHoveredCard] = useState(null);

    const [showCardTimeout, setShowCardTimeout] = useState(null); // State to hold the timeout ID

    const currentUser = useContext(AuthContext)


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

   


    useEffect(() => {
      const fetchData = async () => {
       
          try {
            setLoading(true)
              const info = await getInfo();
              setData(info);
              setLoading(false); // Set loading to false regardless of success or failure
          } catch (error) {
              console.error('Error fetching data:', error);
          } finally {
            setLoading(false); // Set loading to false regardless of success or failure
          }
      };

      fetchData();
  }, []);



  
    // Render loading state if data is not yet fetched

    // if (!data) {
    //     return <Spinner/>;
    // }

    
    // Function to handle mouse enter
    const handleMouseEnter = (movieId) => {
  
      // Set a timeout to show the ShowCard after 2 seconds
      const timeoutId = setTimeout(() => {
          setShowCardTimeout(null); // Clear the previous timeout if it exists
          setShowCardTimeout(setHoveredCard(movieId)); // Set hoveredCard after 2 seconds
      }, 1000); // 2 seconds delay
      setShowCardTimeout(timeoutId); // Save the timeout ID
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
      setHoveredCard(null);
      // Clear the timeout when mouse leaves
      if (showCardTimeout) {
          clearTimeout(showCardTimeout);
          setShowCardTimeout(null);
      }
  };




  
userData?.likedMovies
   
  
  return (
    <>
    {
      userData?.likedMovies.length > 0 && 
      <div className=" slider w-full max-h-full flex justify-center items-center flex-col my-[30px]">

      <div className="slide-header py-[10px] w-[80%] flex items-center gap-[10px]">
       {userData?.likedMovies.length > 0 && <h1 className='text-[20px] mb-[5px] text-left font-[500]'>{userData?.likedMovies && "My Picks"}</h1>}
      </div>
   
<div className='slider-row flex gap-[10px] overflow-x-scroll w-[80%] h-[18vh] flex-nowrap' style={{ overflowX: 'auto' }}>


        {
          userData?.likedMovies?.map(movie => (
            <div className='w-[20%]'
            onMouseEnter={()=> handleMouseEnter(movie.id)} 
            onMouseLeave={handleMouseLeave}
            key={movie.id}
            >


            <ContentCard 
           
             
              data = {movie} loading = {loading} />
            
     
  
              {/* {hoveredCard &&  <div 
                  className=' mt-[-70%] '
                  >
                    
                   <ShowCard 
                      data={userData?.likedMovies?.find(movie => movie.id === hoveredCard)} 
                      animation={hoveredCard === movie.id ? 
                        { opacity: "1", transition: "0.3s", top : "100%" }
                        :
                        { opacity: "0", transition: "0.3s", scale : "70%" }
                    }
                    />

                      
                      
                  </div> 
                  
                  } */}
        
            </div>
          ))
        }
        
      </div>
    </div>}
        </>
  );
}

export default MyPicks;
