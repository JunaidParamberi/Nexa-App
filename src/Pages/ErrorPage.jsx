import React from 'react'
import Err from '../assets/404.svg'
import Button, { ButtonOutlined } from '../components/Button'
import { Link } from 'react-router-dom'


function ErrorPage({message}) {
  return (
    <div className='w-full h-[100vh] flex justify-center items-center flex-col bg-[#c601044e] gap-[20px]'>
        <img
        className='w-[30%]'
        src={Err} alt="404" />

        <div className=' opacity-70 text-cente flex flex-col justify-center items-center'>
            <h1 className=' text-[50px] font-[600] '>OOPS!</h1>
            <h1 className=' mt-[-20px] text-[20px] font-[300]'>{message || "Page not found"}</h1>
        </div>

        <div className='flex gap-3'>
            <Link to="/">
            <Button text="Go Home"  />
            </Link>

            <Link to="..">
            <ButtonOutlined text="Go Back"  />
            </Link>
        </div>

    </div>
  )
}

export default ErrorPage
