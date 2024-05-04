import React, { useEffect, useState, useContext } from 'react'
import bg from "../assets/ott-app-development.png"
import logo from "../assets/NXA_LOGO.svg"
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import Spinner from '../components/Spinner'
import { getAuth, 
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import { PuffLoader } from 'react-spinners'
import { AuthContext } from '../context/AuthContext'


function Login() {

    const [isSeen, setIsSeen] = useState(false)
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signLoad, setSignLoad] = useState(false)
    const navigate = useNavigate()
    const currentUser = useContext(AuthContext)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Spinner />;
    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        if (email && password) {
            setSignLoad(true)
            try {
                const auth = getAuth();
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/");
                    setSignLoad(false)
                    
            } catch (error) {
               console.error(error.message)
               setSignLoad(false)
            }
        }
    };


    const handleGooglelohin = async ()=> {

        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            navigate("/") 

        } catch (e){
            console.error(e.message)
            
        }

    }
    
    
   
    

  return (
    <div>
       <div className="flex flex-col w-full h-[100vh] justify-center">
        <div className=' bg-gradient-to-b from-[#6b0000b9] to-black w-full h-full flex absolute top-0 z-[-1]'></div>
        <img src={bg} alt="bg" className='w-[150%] object-cover bg-cover h-full flex absolute z-[-2] opacity-70' />
        
        
        <div className='w-full flex justify-center items-center'>
        <div className="nav w-[80%] h-[12vh] flex justify-between items-center py-[20px] ">
            <img src={logo} alt=""  className=' h-full'/>
            <div className="buttons flex items-center gap-3">
                <p
                className='text-[14px] font-[300]'
                >Already have an Account ?</p>
                <Link to="/signup">
                <button 
                className='bg-[#ff0000] px-[15px] py-[7px] rounded-lg font-[500] text-[16px] hover:bg-[#ff0000c4] active:bg-[#ff000053]'
                >
                    Register
                </button>
                </Link>
            </div>
            
        </div>
        </div>

        <div className="inputs  w-full h-full flex flex-col justify-center items-center">

            <form
            className='w-[30%] flex flex-col justify-center items-center gap-5 bg-[#00000090] p-[50px] rounded-xl'
            action="">
                <h1
                className=' text-[25px] font-[500]'
                >Log in</h1>

                <input 
                type=  "email"
                placeholder='Enter Email'
                value={email}
                name='email'
                onChange={(e)=> setEmail(e.target.value)}
                className='w-full p-[15px] bg-[#23000043] border-[#e6e6e6] 
                border-[0.5px] rounded-md text-[14px] font-[300] outline-none'
                />

               
                <div className='w-full p-[15px] bg-[#23000043] border-[#e6e6e6] 
                border-[0.5px] rounded-md text-[14px] font-[300] outline-none flex'>


                <input 
                type={isSeen ? "text" : "password"}
                value={password}
                name='password'
                onChange={(e)=> setPassword(e.target.value)}
                placeholder='Password'
                className=' bg-transparent outline-none w-full'
                />

               {
               !isSeen ? <VisibilityIcon 
                onClick = {()=> setIsSeen(true)}
                sx={{opacity :"0.8", cursor : "pointer"}}/>
                :
                <VisibilityOffIcon 
                onClick = {()=> setIsSeen(false)}
                sx={{opacity :"0.8", cursor : "pointer"}}/>
                }
                </div>

                <button 
                className='bg-[#ff0000] w-full p-[15px] rounded-lg font-[500] 
                text-[16px] hover:bg-[#ff0000c4] active:bg-[#ff000053] flex justify-center items-center'
                onClick={handleSignIn}
                >
                    {signLoad ? 
                     
                     <PuffLoader size={23} />
                     
                     : 
                     <nav>Log in</nav>}
                </button>

                <div className="social w-full ">
                    <div className='flex justify-center items-center gap-2'>

                    <GoogleIcon 
                    onClick = {handleGooglelohin}
                    sx={{width : "30px", height :"30px", cursor : "pointer"}}
                    />
                    <AppleIcon 
                    sx={{width : "30px", height :"30px", cursor : "pointer"}}
                    />
                    <FacebookIcon  
                    sx={{width : "30px", height :"30px", cursor : "pointer"}}
                    />
                    </div>

                </div>
                

            </form>
            
        </div>
        </div> 
      <Footer/>
    </div>
  )
}

export default Login
