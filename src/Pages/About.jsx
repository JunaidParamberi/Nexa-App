import React from 'react'
import bg from "../assets/ott-app-development.png"

function About() {
  return (
    <div className=' w-full flex flex-col justify-start items-center  mt-[10%]'>

        <div className=' w-[80%] rounded-lg flex flex-col gap-[20px] bg-gradient-to-b from-[#6b0000b9] to-black p-[30px] '>

        <div className="heading w-full  ">
            <h1 className='text-[30px] font-[600]'>About Nexa Play</h1>
        </div>
        <div>
            <p className=' text-[16px] font-[200] text-justify  text-[#f0f0f0b9] '>
            Welcome to Nexa Play, your premier destination for streaming the latest movies, 
            TV shows, and exclusive content from around the globe! As an aspiring software engineer eager to make a mark in the industry, 
            I've crafted Nexa Play as a showcase of my skills and passion for creating immersive digital experiences.
            </p>
        </div>

        <div className=' flex flex-col gap-[10px] mt-[30px]'>
        <h2 className=' text-[16px] font-[500]'>Unlimited Entertainment, Anytime, Anywhere</h2>
        <p className=' text-[16px] font-[200] text-justify  text-[#f0f0f0b9] '>
                    At Nexa Play, we're committed to delivering a world-class streaming 
                    experience right to your fingertips. Dive into our extensive library of 
                    blockbuster films, binge-worthy series, captivating documentaries, and much more. 
                    With new content added regularly, there's always something fresh and exciting to discover on Nexa Play.
        </p>
        </div>
        
        <div className=' flex flex-col gap-[10px] mt-[30px]'>
        <h2 className=' text-[16px] font-[500]'>Powered by React, Designed for You</h2>
        <p className=' text-[16px] font-[200] text-justify  text-[#f0f0f0b9] '>
        Nexa Play harnesses the power of React to provide a seamless and 
        intuitive user interface that puts you in control. Our sleek and responsive
        design ensures that you can enjoy your favorite content on any device, whether you're
        lounging at home or on the go.
        </p>
        </div>

        <div className=' flex flex-col gap-[10px] mt-[30px]'>
        <h2 className=' text-[16px] font-[500]'>Key Features</h2>
        <ol className=' list-disc '>
            <li className='w-[90%]'><strong>Personalized Recommendations:</strong> Discover new favorites tailored just 
                for you with our advanced recommendation engine. From action-packed thrillers to heartwarming romances,
                 Nexa Play curates a personalized viewing experience based on your preferences and viewing history.</li>
        </ol>
        </div>
        </div>
    </div>
  )
}

export default About
