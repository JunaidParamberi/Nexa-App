import React, { useEffect, useRef, useState, useContext } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar } from "@mui/material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CloseIcon from '@mui/icons-material/Close';
import { Link, NavLink } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/NXA_LOGO.svg';
import DropDown from "./DropDown";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function Navbar() {
    const [isShown, setIsShown] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const currentUser = useContext(AuthContext);
    
    const ref = useRef(null);
    const menuRef = useRef(null);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsShown(false);
            }
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsActive(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
                setIsMobileMenuOpen(false);
            }
        };
        
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).catch(error => console.error(error));
    };

    return (
        <div className={`navbar fixed top-0 z-10 w-full flex justify-center items-center ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'}`}>
            <DropDown active={isActive} refr={menuRef} handleSignOut={handleSignOut} />
            
            <header className="flex w-[90%] justify-between items-center p-[10px]">
                <Link className="w-[6%] max-md:w-[15%] cursor-pointer" to='/'>
                    <img src={logo} alt="app_logo" className="w-full" />
                </Link>
                
                <nav className="hidden md:flex gap-5 font-light text-sm opacity-80">
                {['/', '/movies', '/tv-series', '/trending', '/about'].map((path, index) => (
    <NavLink 
        key={index} 
        to={path} 
        className={({ isActive }) => isActive ? "font-semibold text-red-600 opacity-100" : "opacity-80"}
    >
        {path.substring(1).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Home'}
    </NavLink>
))}

                </nav>
                
                <div className="flex gap-5 items-center">
                    <div className="hidden md:flex items-center gap-2 border border-gray-600 py-1 px-2 rounded-lg" ref={ref}>
                        <SearchIcon />
                        <input type="search" placeholder="Search..." className="bg-transparent outline-none w-40 text-sm" />
                    </div>
                    
                    <div className="md:hidden">
                        {isShown ? 
                            <CloseIcon onClick={() => setIsShown(false)} sx={{ cursor: "pointer" }} /> :
                            <SearchIcon onClick={(e) => { e.stopPropagation(); setIsShown(true); }} sx={{ cursor: "pointer" }} />
                        }
                    </div>
                    
                    <NotificationsNoneIcon sx={{ cursor: "pointer" }} />
                    
                    <div className="flex items-center gap-1">
                        <Avatar sx={{ cursor: "pointer" }} src={currentUser?.photoURL || ""} />
                        {isActive ? 
                            <KeyboardArrowUpIcon sx={{ cursor: "pointer" }} onClick={() => setIsActive(!isActive)} fontSize="small" /> :
                            <KeyboardArrowDownIcon sx={{ cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); setIsActive(!isActive); }} fontSize="small" />
                        }
                    </div>
                    
                    <div className="md:hidden">
                        {isMobileMenuOpen ? 
                            <CloseIcon onClick={() => setIsMobileMenuOpen(false)} sx={{ cursor: "pointer" }} /> :
                            <MenuIcon onClick={(e) => { e.stopPropagation(); setIsMobileMenuOpen(true); }} sx={{ cursor: "pointer" }} />
                        }
                    </div>
                </div>
            </header>
            
            {isShown && (
                <div className="absolute top-[60px] left-0 w-full bg-black p-3 md:hidden flex items-center gap-2 border border-gray-600 rounded-lg" ref={ref}>
                    <SearchIcon />
                    <input type="search" placeholder="Search..." className="bg-transparent outline-none w-full text-sm" />
                </div>
            )}
            
            {isMobileMenuOpen && (
                <nav ref={mobileMenuRef} className="absolute top-[60px] left-0 w-full bg-black p-5 flex flex-col gap-3 text-center md:hidden">
                    {['/', '/movies', '/tv-series', '/trending', '/about'].map((path, index) => (
<NavLink 
key={index} 
to={path} 
className={({ isActive }) => isActive ? "font-semibold text-red-600 opacity-100" : "opacity-80"}
>
{path.substring(1).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Home'}
</NavLink>
))}

                </nav>
            )}
        </div>
    );
}

<nav className="hidden md:flex gap-5 font-light text-sm opacity-80">
{['/', '/movies', '/tv-series', '/trending', '/about'].map((path, index) => (
<NavLink 
key={index} 
to={path} 
className={({ isActive }) => isActive ? "font-semibold text-red-600 opacity-100" : "opacity-80"}
>
{path.substring(1).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Home'}
</NavLink>
))}

</nav>