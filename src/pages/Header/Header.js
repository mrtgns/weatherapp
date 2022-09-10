import React,{useContext} from 'react'
import UserContext from '../../context/UserContext';
import { useNavigate } from "react-router-dom";
const Header = () => {
  let navigate = useNavigate();
  const {loggedIn,setLoggedIn}= useContext(UserContext)
   const handleClick = ()=>{
    localStorage.removeItem("user");
    setLoggedIn(false);
    !loggedIn && navigate("/login");
   }
  return (
    <div className='header-container'>
      <img src="https://w7.pngwing.com/pngs/546/46/png-transparent-weather-forecasting-severe-weather-storm-weather-free-text-heart-logo-thumbnail.png" alt=""></img>
      <button onClick={handleClick} type="submit">Çıkış</button>    
    </div>
  )
}

export default Header