import React, { useState, useEffect } from 'react'
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
        createUserWithEmailAndPassword,
        signInWithPopup,
        GoogleAuthProvider
} from "firebase/auth";


import { Alert } from '@mui/material'
import { PuffLoader } from 'react-spinners'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../Firebase'


function Signup() {

    const [isSeen, setIsSeen] = useState(false)
    const [email, setEmail] = useState("")
    const [userName, setUserName]= useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const [signLoad, setSignLoad] = useState(false)
    const [er, setEr] = useState(false)
    const [inputErro, setInputError] = useState(false)
    const navigate = useNavigate()
    

  


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Spinner />;
    }

    //auth functions
    const handleSignup = (e)=> {

        e.preventDefault()

        if(password === confPassword && email && userName) {
            setSignLoad(true)
           
            setEr(false)
    
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user;
                navigate("/") 

                setEr(false)
                setSignLoad(false)

                await setDoc(doc(db, "users", user.uid), {
                    userName: userName ,
                    email:  user.email,
                    uid : user.uid,
                    likedMovies : [],
                    likedTvShows : [],
                    likedDocumentaries : [],

                    
                  });

                  
            })
            .catch((error) => {
                setSignLoad(false)
                setErrorMessage(error.message)
                setEr(true)
        
      });

        } else {
            setInputError(true)
        }


    }
    

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    //google sign up

    const handleGoogleSignUp = async ()=> {


        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            navigate("/") 
      
            await setDoc(doc(db, "users", user.uid), {
                userName: userName ,
                email:  user.email,
                uid : user.uid,
                likedMovies : [],
                likedTvShows : [],
                likedDocumentaries : [],

                
              });

              console.log(user)
             
            } catch (error){
                    
                    setErrorMessage(error.message)
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
                <Link to="/login">
                <button 
                className='bg-[#ff0000] px-[15px] py-[7px] rounded-lg font-[500] text-[16px] hover:bg-[#ff0000c4] active:bg-[#ff000053]'
                >
                    Log in
                </button>
                </Link>
            </div>
            
        </div>
        </div>

        <div className='flex justify-center items-center min-h-10'>
        
       {er &&  
       <Alert sx={{backgroundColor : "red", width : "30%"}} severity="warning" onClose={() => setEr(false) }>
        {errorMessage}
        </Alert>}

        </div>


        <div className="inputs  w-full h-full flex flex-col justify-center items-center">

              
            <form
            className='w-[30%] max-md:w-[90%] flex flex-col justify-start items-start gap-5 bg-[#00000090] p-[50px] rounded-xl'
            action="">
                <h1
                className=' text-[25px] font-[500]'
                >Sign Up</h1>

                <div className='w-full flex flex-col gap-[3px]'>

                <input 
                type="email"
                value={email}
                name='email'
                onChange={(e)=> setEmail(e.target.value)}
                placeholder='Enter Email'
                className={`w-full p-[15px] bg-[#23000043] border-[#e6e6e6] 
                border-[0.5px] rounded-md text-[14px] font-[300] outline-none ${email &&  !emailRegex.test(email) && " focus:border-[red]"}` }
                />
                {email &&  !emailRegex.test(email) &&
                    <p className=' text-red-600 text-left text-[12px]  '>*Please enter a valid email address</p>}
                </div>


                <input 
                type="text"
                value={userName}
                name='userName'
                onChange={(e)=> setUserName(e.target.value)}
                placeholder='Create User name'
                className='w-full p-[15px] bg-[#23000043] border-[#e6e6e6] 
                border-[0.5px] rounded-md text-[14px] font-[300] outline-none'
                />

                
                <div className={`w-full p-[15px] bg-[#23000043] border-[#e6e6e6] 
                border-[0.5px] rounded-md text-[14px] font-[300] outline-none flex ${password === confPassword ? "" :  " border-[red]"}`}
                >


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

                <div className={`w-full p-[15px] bg-[#23000043] border-[#e6e6e6] 
                border-[0.5px] rounded-md text-[14px] font-[300] outline-none flex ${password === confPassword ? "" :  " border-[red]"}`}>


                <input 
                type={isSeen ? "text" : "password"}
                value={confPassword}
                name='confPassword'
                onChange={(e)=> setConfPassword(e.target.value)}
                placeholder='Confrim Password'
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

                {password === confPassword ? 
                (
                    <p className='h-[10px] text-red-600 font-[300] text-[16px]'>{""}</p>
                ) 
                : 
                
                (
                    <p className=' text-red-600 text-left text-[12px] mt-[-10px]  '>*Please make sure your passwords match</p>
                    
                    
                )}


                <button 
                className='bg-[#ff0000] w-full p-[15px] rounded-lg font-[500] 
                text-[16px] hover:bg-[#ff0000c4] active:bg-[#ff000053] flex justify-center items-center'
                onClick={handleSignup}
                >
                    {signLoad ? 
                     
                     <PuffLoader size={23} />
                     
                     : 
                     <nav>Register</nav>}
                </button>
                { inputErro ?
                <p className=' text-red-600 text-left text-[12px] mt-[-10px]  '>*Please fill the inputs </p>
                    :

                    <p className=' text-red-600 text-left text-[12px] mt-[-10px]  '>{""}</p>
                }

                <div className="social w-full ">
                    <div className='flex justify-center items-center gap-2'>

                    <GoogleIcon 
                    onClick = {handleGoogleSignUp}
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

export default Signup
