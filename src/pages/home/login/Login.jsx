import React, { useState } from "react";
import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

function Login({ getUser }) {
  const navigate = useNavigate();
  const [emailName, setEmailName] = useState("");
  const [pasword, setPasword] = useState("");
  const [ese, setEse] = useState(false); 

  const getLogin = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email_or_phone: emailName,
      password: pasword,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://ecommercev01.pythonanywhere.com/user/token/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem("shopToken", result.access);
        setEmailName("");
        setPasword("");
        getUser();
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="logins">
        <div className="container">
          <div className="imgs_logins">
            <img src="/public/imgs/Side Image.png" alt="" />
          </div>

          <div className="login">
            <h1>Log in to Exclusive</h1>
            <p>Enter your details below</p>
            <input
              value={emailName}
              onChange={(e) => {
                setEmailName(e.target.value);
              }}
              type="email"
              required
              placeholder="Email or Phone Number"
            />
            <br />
            <div className="eye">
              <input
                value={pasword}
                onChange={(e) => {
                  setPasword(e.target.value);
                }}
                placeholder="Password"
                required
                type={ese ? "text" : "password"} 
              />
              <div
                className="eyes"
                onClick={() => setEse(!ese)} 
              >
                {ese ? <IoEyeOutline /> : <FaRegEyeSlash />} 
              </div>
            </div>
            <div className="btn_login">
              <button
                onClick={() => {
                  getLogin();
                }}
              >
                Log In
              </button>
              <span>Forget Password?</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
