import React,{useContext} from 'react'
import UserContext from '../../context/UserContext';
import { useNavigate } from "react-router-dom";
const Header = () => {
  let navigate = useNavigate();
  const {setLoggedIn}= useContext(UserContext)
   const handleClick = ()=>{
      setLoggedIn(false);
      localStorage.setItem("user",false);
      navigate("/login");
   }
  return (
    <div className='header-container'>
      <img src="https://www.pngall.com/wp-content/uploads/11/Weather-PNG-Pic.png" alt=""></img>
      <button onClick={handleClick} type="submit">LogOut</button>    
    </div>
  )
}

export default Header
