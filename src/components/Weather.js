import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../pages/Header/Header";
import loading from "../hoc/Loading";


function Weather(props) {
  const [cityData, setCityData] = useState("");
  const API_KEY = "c1079f0b50c86fe81767f08f08d071e6";
  const [selectedCity, setSelectedCity] = useState('');


	const addLocalStorage = (city) => {
    let cityList = JSON.parse(localStorage.getItem("city")) || [];

    // name check
    if (cityList.includes(city)) {
      alert('Sehir zaten var!')
    } else {

      if(cityList.length < 3) {
        localStorage.setItem("city", JSON.stringify([...cityList, city]));
      } else {
        const updatedCityList = cityList.slice(1);
        localStorage.setItem("city", JSON.stringify([...updatedCityList, city]));
      }
    }
  }

  // function get temp data
  const getTempData = async (api, query, submit) => {
		props.setLoading(true);
    try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&lang=tr&appid=${api}`
        );
				console.log("data", data);
				setCityData(data);
				submit && addLocalStorage(query);
    } catch {
      alert("Geçerli Bir Şehir Adı Giriniz");
    }
		props.setLoading(false);
  };

  // call use Effect for render data every search input
  useEffect(() => {
    // elimde local storage da bir data varsa cek
    let cityList = JSON.parse(localStorage.getItem("city")) || [];
    if(cityList.length) {
      // default city index is zero
      getTempData(API_KEY, cityList[0]);
    }
    // eslint-disable-next-line
  }, []);

  function formSubmit(e) {
    e.preventDefault();
    console.log('selectedCity____: ', selectedCity);
    getTempData(API_KEY, selectedCity, true);
    setSelectedCity(''); // reset
  }

  let localData = JSON.parse(localStorage.getItem("city"));

  function handleClick(cityName) {
    getTempData(API_KEY, cityName);
  }

  let icon = `https://openweathermap.org/img/wn/${cityData?.weather?.map(
    (item) => item.icon
  )}.png`;


  return (
    <div className="weather-page">
      <Header />
      <div className="weather-container">
        <form className="weather-form" >
          <input 
            type="text" 
            placeholder="Enter City Name" 
            name="city" 
						value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
          />
          <button 
						onClick={formSubmit}
						disabled={!selectedCity}
						>
            <img
              src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-1024.png" 
              alt="search"
            />
          </button>
        </form>
      </div>
      <div className="weather-all">
        <div className="weather-left">
          <h2 id="localdata" onClick={e=>handleClick(localData[0])}>
            {localData ? localData[0] : null}
          </h2>
          <h2 id="localdata" onClick={e=>handleClick(localData[1])}>
            {localData ? localData[1] : null}
          </h2>
          <h2 id="localdata" onClick={e=>handleClick(localData[2])}>
            {localData ? localData[2] : null}
          </h2>
        </div>

        {cityData && (
          <div className="weather-data">
            <table>
              <tbody>
                <tr>
                  <td>
                    {" "}
                    <img
                      src="https://www.shareicon.net/download/2016/08/18/810681_pin_512x512.png"
                      alt="city"
                    />{" "}
                  </td>
                  <td>{cityData.name} </td>
                  <td>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/temperature-1575430-1331704.png"
                      alt="sıcaklık"
                    />
                  </td>
                  <td>{cityData.main.temp} °C</td>
                </tr>

                <tr>
                  <td>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/728/728093.png"
                      alt="humidity"
                    />
                  </td>
                  <td> %{cityData.main.humidity}</td>
                  <td>
                    <img src={icon} alt="icon" />
                  </td>
                  <td>{cityData?.weather.map((item) => item.description)}</td>
                </tr>

                <tr>
                  <td>
                    <img
                      src="https://cdn.icon-icons.com/icons2/1370/PNG/512/if-weather-27-2682824_90788.png"
                      alt="sunrise"
                    />
                  </td>
                  <td>
                    {new Date(cityData.sys.sunrise * 1000).toLocaleTimeString()}
                  </td>
                  <td>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3226/3226463.png"
                      alt="sunset"
                    />
                  </td>
                  <td>
                    {new Date(cityData.sys.sunset * 1000).toLocaleTimeString()}
                  </td>
                </tr>

                <tr>
                  <td>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2858/2858416.png"
                      alt="date"
                    />
                  </td>
                  <td>{new Date(cityData.dt * 1000).toLocaleDateString()}</td>
                  <td>
                    <img
                      src="https://icon-library.com/images/windy-weather-icon/windy-weather-icon-7.jpg"
                      alt="wind"
                    />
                  </td>
                  <td>{cityData.wind.speed}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default loading(Weather);
