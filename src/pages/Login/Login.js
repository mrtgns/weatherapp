import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
const Login = () => {
  const { setLoggedIn } = useContext(UserContext);
  const [user, setUser] = useState({ username: "", password: "" });
  let navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (user.username === "murat" && user.password === "1234") {
      setLoggedIn(true);
      localStorage.setItem("user", true);
      navigate("/");
    } else {
      alert("kullanıcı adı veya parola hatalı");
    }
  };
  return (
    <div className="login-page">
      <h2>Weather App</h2>
      <div className="login-container">
        <img
          src="https://w7.pngwing.com/pngs/546/46/png-transparent-weather-forecasting-severe-weather-storm-weather-free-text-heart-logo-thumbnail.png"
          alt="weather"
          className="logo"
        ></img>
        <form className="login-form">
          <label>Kullanıcı Adı</label>
          <input name="username" onChange={handleChange} type="text" />
          <label>Parola</label>
          <input name="password" onChange={handleChange} type="password" />
          <button onClick={handleLogin} type="submit">
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
