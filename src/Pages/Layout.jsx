import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import DropDown from '../components/DropDown'
import { getAuth, signOut } from "firebase/auth";

function Layout() {

 
  return (
    <div className='min-h-[100vh] w-screen  flex flex-col justify-between items-center'>
    <Navbar/>

    <div className='w-full'>

    <Outlet/>
  
   

 
    </div>



    <Footer/>

    </div>
  )
}

export default Layout
