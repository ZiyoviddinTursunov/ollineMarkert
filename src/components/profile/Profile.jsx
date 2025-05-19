import React, { useEffect, useState } from "react";
import "./Profile.css";
import { toast } from "react-toastify";

function Profile() {
  const [emaile, setEmaile] = useState(null);
  const [fireName, setfireName] = useState(null);
  const [last_name, setlast_name] = useState(null);
  const [address, setaddress] = useState(null);
  const [password, setpassword] = useState(null);
  const [phone, setphone] = useState(null);

  const getData = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("shopToken")}`
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://ecommercev01.pythonanywhere.com/user/detail/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setEmaile(result?.email_or_phone);
        setfireName(result?.first_name);
        setlast_name(result?.last_name);
        setpassword(result?.password);
        setaddress(result?.address);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getData();
  }, []);

  const upDateProfile = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("shopToken")}`
    );

    const raw = JSON.stringify({
      first_name: fireName,
      last_name: last_name,
      email: emaile,
      phone: phone,
      address: address,
      password:
       password,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://ecommercev01.pythonanywhere.com/user/update-profile/",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
        toast.success("Malumotlar o'zgartirildi")
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="profile">
        <div className="container">
          <div className="breadcrumb">
            <span>Home</span> / <span className="current">My Account</span>
          </div>

          <div className="welcome-text">
            Welcome! <span className="highlight">{fireName}</span> <span className="highlight">{last_name}</span> 
          </div>

          <div className="profile-container">
            <div className="sidebar">
              <h4>Manage My Account</h4>
              <ul>
                <li className="active">My Profile</li>
                <li>Address Book</li>
                <li>My Payment Options</li>
              </ul>

              <h4>My Orders</h4>
              <ul>
                <li>My Returns</li>
                <li>My Cancellations</li>
              </ul>

              <h4>My Wishlist</h4>
            </div>

            <div className="profile-form">
              <h3>Edit Your Profile</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input value={fireName} onInput={(e)=>{
                    setfireName(e.target.value)
                  }} type="text" placeholder="Md" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input value={last_name} onInput={(e)=>{
                    setlast_name(e.target.value)
                  }} type="text" placeholder="Rimel" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={emaile}
                    onInput={(e)=>{
                      setEmaile(e.target.value)
                    }}
                    type="email"
                    placeholder="rimel111@gmail.com"
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input value={address} onInput={(e)=>{
                    setaddress(e.target.value)
                  }}
                    type="text"
                    placeholder="Kingston, 5236, United State"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input value={phone} onInput={(e)=>{
                    setphone(e.target.value)
                  }}
                    type="number"
                    placeholder="907779760"
                  />
                </div>
              </div>

              <h4>Password Changes</h4>
              <div className="form-group">
                <label>New Password</label>
                <input value={password} onInput={(e)=>{
                    setpassword(e.target.value)
                  }} type="password" />
              </div>
             
              <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" />
              </div>

              <div className="form-actions">
                <button className="cancel-btn">Cancel</button>
                <button onClick={()=>{
                  upDateProfile()
                }} className="save-btn">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
