import React from 'react'
import logo from '../assets/NXA_LOGO.svg'
import CloudOffIcon from '@mui/icons-material/CloudOff';

function OfflinePage() {
  return (
    <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
        <div className='w-full justify-center flex items-center flex-col'>
         <img src={logo} alt="Logo" className='w-[20%]' />
         <div className='flex items-center justify-center gap-2'>
        <CloudOffIcon fontSize='large'/>
         <h1
         className=' text-[25px]'
         >You’re offline </h1>
         </div>
        </div>
    </div>
  )
}

export default OfflinePage
