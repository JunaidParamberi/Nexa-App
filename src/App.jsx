import { useContext, useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Slider from './components/Slider'
import Footer from './components/Footer'
import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './Pages/Layout'
import Home from './Pages/Home'
import ContentDetails from './Pages/ContentDetails'
import VideoPlyer from './components/VideoPlyer'
import ErrorPage from './Pages/ErrorPage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { AuthContext } from './context/AuthContext'
import AuthRequired from './AuthRequired'
import OfflinePage from './Pages/OfflinePage'
import logoOnline from '../src/assets/NXA_LOGO.svg'
import logoOffline from '../src/assets/NXA_LOGO_offline.svg'
import About from './Pages/About'


function App() {

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, [isOnline]);



    useEffect(() => {
    updateFavicon();
  }, [isOnline]);

  const updateFavicon = () => {
    const link = document.querySelector("link[rel*='icon']");
    if (link) {
      link.href = isOnline ? logoOnline : logoOffline;
    }
  };

  if(!isOnline){
    return <OfflinePage/>
  }

  return (
    <div className='w-screen'>

    <Routes>
      
      <Route  path='/' element={<Layout />}>

        <Route  index element= {
          <AuthRequired>
          <Home />
        </AuthRequired> } />

        <Route path='movies' element={<h1>This Movies</h1>} />
        <Route path='tv series' element={<h1>This tv series</h1>} />
        <Route path='trending' element={<h1>This tv trending</h1>} />
        <Route path='about' element={<About/>} />

        
        {/* Nested routes for ContentDetails and VideoPlayer */}
        <Route path='details/:id' element={<ContentDetails />} />
        <Route path='details/:id/:title' element={<VideoPlyer />} />
          <Route path='*' element={<ErrorPage />} />
      </Route>
      {/* Wildcard route outside of Layout */}
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
    </Routes>
            </div>
  );
}

export default App;
