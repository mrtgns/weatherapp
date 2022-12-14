import React from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "../src/style/main.scss"
import { UserProvider } from './context/UserContext';

import Home from './pages/Home/Home';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './pages/Login/Login';
import { WeatherProvider } from './context/WeatherContext';


function App() {
  
  return (
   <UserProvider>
    <WeatherProvider>
    <BrowserRouter>
    
    <Routes>
      
    
      <Route path="/" element={<ErrorBoundary><Home/></ErrorBoundary>}></Route>
      <Route path='/login' element={<Login/>} ></Route>
      
      
    </Routes>
  </BrowserRouter>
  </WeatherProvider>
  </UserProvider>
  )
}

export default App
