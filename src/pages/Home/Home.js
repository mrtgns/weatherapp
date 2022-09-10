import React, {useContext} from 'react'
import Weather from '../../components/Weather';

import UserContext from "../../context/UserContext";
import Login from '../Login/Login';

const Home = () => {
  
  return (
    <div>
      <Weather/>
    </div>
  )
}

export default Home
