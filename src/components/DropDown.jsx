import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import HelpIcon from '@mui/icons-material/Help';
import { CSSTransition } from "react-transition-group";


function DropDown({txt, onClick, icon, handleSignOut, active, refr, setIsActive}) {

  const handleClickOusite = (e)=> {
    e.stopPropagation(); 
    setIsActive(true)
  }

  return (
    <CSSTransition
            in={active}
            timeout={300}
            classNames="dropdown"
            unmountOnExit
        >
            <div 
            ref={refr}
            onClick={handleClickOusite}
            className="drop-down-menu w-[15%] 
            bg-[#010101] flex absolute z-[-0] top-[110%] right-[11%] p-3 py-[20px] rounded-md shadow-xl ">
                <div>
                    <ul className="text-[15px] font-[300] text-left flex flex-col gap-3">
                        <li onClick={onClick}>
                            {" "}
                            <AccountCircleIcon fontSize="small" /> Manage Profile
                        </li>
                        <li onClick={onClick}>
                            {" "}
                            <PersonIcon fontSize="small" /> Account
                        </li>
                        <li onClick={onClick}>
                            {" "}
                            <HelpIcon fontSize="small" /> Help Center
                        </li>

                        <div className="h-[1px] w-full bg-white"></div>
                    </ul>
                    <p
                        onClick={handleSignOut}
                        className="  text-[16px] font-[500] mt-[10px] cursor-pointer flex justify-start items-center p-[5px] gap-[5px] opacity-80 hover:opacity-100 active:opacity-50 "
                    >
                        {" "}
                        <ExitToAppIcon fontSize="small" /> Sign Out{" "}
                    </p>
                </div>
            </div>
        </CSSTransition>  )
}

export default DropDown
