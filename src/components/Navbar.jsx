import React, { useEffect, useRef, useState, useContext } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar } from "@mui/material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CloseIcon from '@mui/icons-material/Close';
import { Link, NavLink } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import logo from '../assets/NXA_LOGO.svg'
import DropDown from "./DropDown";
import { getAuth, signOut } from "firebase/auth"
import { AuthContext } from "../context/AuthContext";
import { Opacity } from "@mui/icons-material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function Navbar(){


    const [isShown, setIsShown] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const currentUser = useContext(AuthContext)
    const [isScrolled, setIsScrolled] = useState(false); // State to track scroll position

    

    const ref = useRef(null)
    const menuRef = useRef(null)

    const activeStyle = {
        fontWeight : "800",
        opacity : "1",
        

    }

    useEffect(() => {
        const handleScroll = () => {
            // Check if window has scrolled beyond certain threshold
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);

        return () => {
            // Clean up event listener
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsShown(false);
               
            }
        };
    
        document.addEventListener("click", handleClickOutside);
    
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref]);
    
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsActive(false); // Close dropdown when clicking outside
            }
        };
    
        document.addEventListener("click", handleClickOutside);
    
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [menuRef]);
    

  
    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            setIsShown(false);
        }
    };

    const handleSignOut = ()=>{
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    }
   



    return (
        <div className={` navbar bg-gradient-to-b fixed top-0 z-10 w-full flex justify-center items-center  ${isScrolled ? 'bg-[black] active' :  ' bg-gradient-to-b from-black to-transparent'}`}
         
         >
         <DropDown active = {isActive} refr = {menuRef} handleSignOut={handleSignOut}/>
        <header className="flex w-[80%] justify-between items-center p-[10px] ">
            <Link className="w-[5%] cursor-pointer" to='/'>
            <img 
            
            src={logo}  alt="app_logo" />
            </Link>
           

            <ul 
            className="nav-link flex gap-5 font-[200] text-[15px] opacity-80 "
            >
                <NavLink
                 style={({ isActive }) => (isActive ? {fontWeight : "600", color : "#CF1F3B",  opacity : "1"} : null)}
                 to="/">
                    Home
                </NavLink>

                <NavLink 
              style={({ isActive }) => (isActive ? {fontWeight : "600", color : "#CF1F3B",  opacity : "1"} : null)}
                to="movies">
                    Movies
                </NavLink>

                <NavLink
              style={({ isActive }) => (isActive ? {fontWeight : "600", color : "#CF1F3B",  opacity : "1"} : null)}
                to="tv series">
                TV Series
                </NavLink>

                <NavLink
              style={({ isActive }) => (isActive ? {fontWeight : "600", color : "#CF1F3B",  opacity : "1"} : null)}
                to= "trending"  >
                Trending
                </NavLink>

                <NavLink
              style={({ isActive }) => (isActive ? {fontWeight : "600", color : "#CF1F3B",  opacity : "1"} : null)}
                to="about" >
                    About
                </NavLink>
            </ul>

           

            <div className="flex justify-center gap-5 items-center">

            <div  className=" mr-[30px] search flex gap-2 w-[350px] justify-end items-center">
                

                
                <div ref={ref} 
                
                // className={` flex border-[1px] 
                // border-[#ffffff56] py-[5px] px-[10px] gap-2 rounded-[12px] `}

                className={`search-box ${isShown ? 'active' : ''}`}
                 
                >    
                     <SearchIcon/>
                     <input 
                     onKeyDown={handleKeyPress}
                     type="search" 
                     placeholder="Search Movies, Series..." 
                     className=" bg-transparent outline-none pl-[3px] font-[200] text-[15px]
                     w-[250px]"
                     />
                 </div>
                 
                  <div>


             {isShown === false ?  
                <SearchIcon 
                
                onClick={(e) => {
                    e.stopPropagation(); 
                    setIsShown(true);
                }}
                sx={{ cursor: "pointer" }}
 
                /> 
                :
                <CloseIcon
                    onClick={() => setIsShown(false)}
                    sx={{ cursor: "pointer" }}
                    
                />
            }
             </div>
 
            
 
                 
             </div>
         
            <NotificationsNoneIcon sx={{cursor : "pointer"}}/>
            <div className="flex  items-center gap-1">

            <Avatar
          
           
             sx={{cursor : "pointer", }}
            src={currentUser?.photoURL || ""}
                
                />    
            <div>
               {
               isActive ? 
                <KeyboardArrowUpIcon
                sx={{
                    cursor : "pointer"
                }}
                 onClick = {()=> {
                    setIsActive (prevState => !prevState)}}
                fontSize="small"
                />
               :
               <KeyboardArrowDownIcon
                sx={{
                    cursor : "pointer"
                }}
                onClick = {(e)=> {
                    e.stopPropagation(); 
                    setIsActive (prevState => !prevState)}}
                fontSize="small"
                />
            }
            </div>


            </div>
            </div>

           
        </header>
        </div>
    )
}