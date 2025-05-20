import React, { useEffect, useState } from 'react'
import "./SingUp.css"
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
function SingUp() {


  const [name, setName] = useState(null);
  const [emailOrPhone, setEmailOrPhone] = useState(null);
  const [password, setPassword] = useState(null);



const navigate=useNavigate()
const registratsiya=()=>{
  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "first_name": name,
  "email_or_phone": emailOrPhone,
  "password": password
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://ecommercev01.pythonanywhere.com/user/register/", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    console.log(result);
    
setName("")
setEmailOrPhone("")
setPassword("")
toast.success("siz ro'yhatdan o'ttingiz")
navigate("/logns")
  })
  .catch((error) => console.error(error));
}






  return (
    <>
      <div className="singUp">
        <div className="container">
            <div className="imgs_login">
                <img src="/imgs/Side Image.png" alt="" />
            </div>
            <div className="login_registratsiya">

            <div className="addAcaunt-card">
    <h1>Create an account</h1>
    <p>Enter your details below</p>
    <form onSubmit={(e)=>{
      e.preventDefault()
      registratsiya()
    }} action="">
        <input value={name} onChange={(e)=>{
         setName(e.target.value);
          
        }} placeholder='Name' type="name" required/>
        <input value={emailOrPhone} onChange={(e)=>{
         setEmailOrPhone(e.target.value);
          
        }} placeholder='Email or Phone Number' type="email" required/>
        <input value={password} onChange={(e)=>{
        setPassword(e.target.value);
          
        }} placeholder='Password' type="password" required/>
        <button className='addAccauntBtn'>Create Account</button>
        <button className='googleAccaunt'><FcGoogle className='FcGoogle'/>  Sign up with Google</button>
        <p>Already have account? <span> <Link to={"/logns"}>Log in</Link> </span></p>
    </form>
</div>


                   

            </div>
        </div>
        </div>  
    </>
  )
}

export default SingUp