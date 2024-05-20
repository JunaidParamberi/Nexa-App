import React from 'react'
import { PuffLoader, 
  ClimbingBoxLoader,
  ClipLoader,
  FadeLoader,
  HashLoader,
  MoonLoader,
  SyncLoader

  
 } from 'react-spinners'


function Spinner() {
  return (
    <div className='w-full h-full flex justify-center items-center absolute  '>
      <SyncLoader color='white'/>
    </div>
  )
}

export default Spinner
