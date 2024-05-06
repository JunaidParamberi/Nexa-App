import React, {useEffect, useState} from 'react'
import Hero from '../components/Hero'
import Slider from '../components/Slider'
import DropDown from '../components/DropDown'
import { getInfo } from '../../Api'
import { Skeleton } from '@mui/material'
import PlyerCard from '../components/PlyerCard'
function Home() {

  const [data, setData] = useState(null)
  const [er, setEr] = useState(false)
  const [loading, setLoading] =  useState(false)


  useEffect(() => {
    const fetchData = async () => {
        try {
            const info = await getInfo();
            setData(info);
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



  return (
    <div>
                   
      <Hero/>
      {/* <PlyerCard/> */}
      {data && Object.entries(data)
      .map((item, index) => (
      <Slider key={index} item = {item}/>
      
    ))}
    </div>
  )
}

export default Home
