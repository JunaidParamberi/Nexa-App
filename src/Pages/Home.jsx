import React, {useEffect, useState, useContext} from 'react'
import Hero from '../components/Hero'
import Slider from '../components/Slider'
import DropDown from '../components/DropDown'
import { getInfo } from '../../Api'
import { Skeleton } from '@mui/material'
import PlyerCard from '../components/PlyerCard'
import { AuthCredential } from 'firebase/auth/cordova'
import { AuthContext } from '../context/AuthContext'
import { db } from '../../Firebase'
import { getDoc, doc } from 'firebase/firestore'
import MyPicks from '../components/MyPicks'
import ErrorPage from '../Pages/ErrorPage'
function Home() {

  const [data, setData] = useState(null)
  const [er, setEr] = useState(false)
  const [loading, setLoading] =  useState(false)
  const [userData, setUserData]= useState(null)

  const currentUser = useContext(AuthContext)

  var erMsg

  useEffect(() => {
    const fetchData = async () => {
        try {
            const info = await getInfo();
            setData(info);
            setEr(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setEr(true);
            erMsg = error.messgae
        } finally {
            setLoading(false); // Set loading state back to false when data fetching completes
        }
    };

    fetchData();
}, []); // Empty dependency array to ensure effect runs only once on mount

useEffect(()=> {
  const fetchUserData = async () => {
  const userRef = doc(db, "users", currentUser.uid);
   const userSnap = await getDoc(userRef);

if (userSnap.exists()) {
   setUserData(userSnap.data())
}
  }

  fetchUserData()
},[userData])


console.log(erMsg)

if(er){
  return (
    <ErrorPage message={erMsg}/>
  )
}




  return (
    <div className=' w-full'>
                   
      <Hero/>
      <MyPicks/>
      {/* <PlyerCard/> */}
      {data && Object.entries(data)
      .map((item, index) => (
      <Slider key={index} item = {item}/>
      
    ))}

    </div>
  )
}

export default Home
