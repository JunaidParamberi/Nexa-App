import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='w-full flex mt-[50px] flex-col justify-center items-center py-[30px]' >
      <div className=' footer-links flex w-[80%] items-start  justify-between ' >
        <ul>
            <h3>Company</h3>
            <Link>About Us</Link>
            <Link>Careers</Link>
        </ul>

        <ul>
            <h3>Need Help</h3>
            <Link>Visit Help Center?</Link>
            <Link>Share Feedback</Link>
        </ul>

        {/* <ul>
            <h3>View Website in</h3>
            <div className='select'>
            <select name="" id="">
                <option 
                value="">English</option>
                <option
                 value="">Spanish</option>
            </select>
            </div>
        </ul> */}

        <ul>
            <h3>Social Media</h3>

            <div className='flex gap-2'>

            <a href="">
            <InstagramIcon
            fontSize='small'
            />


            </a>

            <a href="">
                
            <TwitterIcon
            fontSize='small'
            sx={{cursor : "pointer"}}
            />
            </a>
            <a href="">
                
            <YouTubeIcon
            fontSize='small'
            sx={{cursor : "pointer"}}
            />
            </a>

            <a href="">
                
            <FacebookIcon
            fontSize='small'
            sx={{cursor : "pointer"}}
            />
            </a>
            </div>
           
            
        </ul>

      </div>

      <div className="copyright w-[80%] mt-[20px]">
        <div className='w-full h-[0.4px] bg-white bg-opacity-[0.6]'></div>

        <div className=' tc flex gap-7 text-[14px] opacity-[0.6] mt-[10px] font-[200]'>
            <p>© 2024 Nexa Play. All Rights Reserved.</p>
            <Link>Terms Of Use </Link>
            <Link>Privacy Policy </Link>
            <Link>FAQ</Link>
            
        </div>
      </div>
    </footer>
  )
}

export default Footer
