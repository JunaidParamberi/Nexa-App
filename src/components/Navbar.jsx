import React, { useEffect, useRef, useState, useContext } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar } from "@mui/material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import logo from '../assets/NXA_LOGO.svg'
import DropDown from "./DropDown";
import { getAuth, signOut } from "firebase/auth"
import { AuthContext } from "../context/AuthContext";


export default function Navbar(){


    const [isShown, setIsShown] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const currentUser = useContext(AuthContext)
    

    const ref = useRef(null)
    const menuRef = useRef(null)

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
        <div className="bg-gradient-to-b fixed from-black to-transparent  top-0 z-10
         flex w-full justify-center items-center py-[10px] ">
         <DropDown active = {isActive} refr = {menuRef} handleSignOut={handleSignOut}/>
        <header className="flex w-[80%] justify-between items-center p-[10px] ">
            <Link className="w-[7%] cursor-pointer" to='/'>
            <img 
            
            src={logo} alt="app_logo" />
            </Link>
           

            <ul 
            className="nav-link flex gap-5 font-[200] text-[15px] "
            >
                <Link>Home</Link>
                <Link>Movies</Link>
                <Link>Series</Link>
                <Link>Trending</Link>
                <Link>About</Link>
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

            <Avatar
            onClick = {(e)=> {
                e.stopPropagation(); 
                setIsActive (prevState => !prevState)}}
             sx={{cursor : "pointer"}}
            src={currentUser?.photoURL || ""}
                
                />      
            </div>

           
        </header>
        </div>
    )
}