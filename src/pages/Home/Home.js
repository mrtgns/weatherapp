import React, {useContext} from 'react'
import Weather from '../../components/Weather';
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Login from '../Login/Login';


const Home = () => {
  const {loggedIn}= useContext(UserContext)
  return (
    <div>
     {/* {loggedIn ? <Weather/> : <Login/> }    */}
     <Weather/>
    </div>
  )
}

export default Home
