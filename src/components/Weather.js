import axios from "axios";
import {  useEffect, useState } from "react";

import Header from "../pages/Header/Header";
import loading from "../hoc/Loading";

//
//
function Weather(props) {
 
  
  const [inputValue, setInputValue] = useState("");
  const [cityData, setCityData] = useState("");
  const [city, setCity] = useState([]);
  const API_KEY = "c1079f0b50c86fe81767f08f08d071e6";

  // function get temp data
  const getTempData = async(api, query) => {
    try {
      
      if(inputValue.length>0){
       const {data}= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&lang=tr&appid=${api}`)
       props.setLoading(true);
       setInputValue(query)
       setCityData(data);
       console.log("data",data);
       props.setLoading(false)
       
      }
    } catch {
      
      alert("Geçerli Bir Şehir Adı Giriniz")
    }
          
   
  };

  // call use Effect for render data every search input
  useEffect(() => {
   
    getTempData(API_KEY, inputValue);
    // eslint-disable-next-line
  }, [inputValue]);

  function formSubmit(e) {
    e.preventDefault()
    let Name =e.target.elements.inputname.value;
    
    setInputValue(Name);
    setCity([...city,Name])
    if(city.length>2){
      localStorage.removeItem(city[0])
    }else{

      localStorage.setItem("city", JSON.stringify([...city,Name])); 
    }
    
    console.log(city);
    inputValue("")
  }
  function  handleClick(e){
    let local=document.getElementById('localdata').innerHTML;
    setInputValue(local)
    console.log(inputValue);
    e.preventDefault()
  }
  let icon =`https://openweathermap.org/img/wn/${cityData?.weather?.map(item=>item.icon)}.png`
  let localData = JSON.parse(localStorage.getItem("city"))
  return (
    
    
    
    <div className="weather-page">
      <Header/>
       <div className="weather-container">
      <form className="weather-form" onSubmit={formSubmit}>
        
      <input
        type="text"
        placeholder="Enter City Name"
        name="inputname"
        
        
        
        />
       <button><img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-1024.png" alt="search" /></button>
       
      </form>
        
       </div>
      <div className="weather-all">
        <div className="weather-left">
          <h2 id="localdata" onClick={handleClick}>
            {localData ? localData[0] : null}
          </h2>
          <h2 id="localdata" onClick={handleClick}>
          {localData ? localData[1] : null}
          </h2>
          <h2 id="localdata" onClick={handleClick}>
          {localData ? localData[2] : null}
          </h2>
        </div>
        
      {cityData && (
        <div className="weather-data">
          
          <table>
            <tbody>
              
          <tr>
            <td> <img src="https://www.shareicon.net/download/2016/08/18/810681_pin_512x512.png" alt="city"/> </td>
            <td>{cityData.name} </td>
            <td><img src="https://w7.pngwing.com/pngs/672/344/png-transparent-thermometer-computer-icons-temperature-others-electric-blue-celsius-thermometer.png" alt="sıcaklık"/></td>
            <td>{cityData.main.temp} °C</td>
          </tr>
          
          <tr>
            <td><img src="https://cdn-icons-png.flaticon.com/512/728/728093.png" alt="humidity"/></td>
            <td> %{cityData.main.humidity}</td>
            <td><img src={icon}   alt="icon"/></td>
            <td>{cityData?.weather.map(item=>item.description)}</td>
          </tr>  
            
          <tr>
            <td><img src="https://cdn.icon-icons.com/icons2/1370/PNG/512/if-weather-27-2682824_90788.png" alt="sunrise"/></td>
            <td>{new Date(cityData.sys.sunrise*1000).toLocaleTimeString()}</td>
            <td><img src="https://cdn-icons-png.flaticon.com/512/3226/3226463.png" alt="sunset"/></td>
            <td>{new Date(cityData.sys.sunset*1000).toLocaleTimeString()}</td>
          </tr>  
            
          <tr>
            <td><img src="https://cdn-icons-png.flaticon.com/512/2858/2858416.png" alt="date"/></td>
            <td>{new Date(cityData.dt * 1000).toLocaleDateString()}</td>
            <td><img src="https://icon-library.com/images/windy-weather-icon/windy-weather-icon-7.jpg" alt="wind"/></td>
            <td>{cityData.wind.speed}</td>
          </tr>  
          
            </tbody>
        
          
          </table>
        </div>
      ) }
      </div>
    </div>
  );
}


export default loading(Weather);
