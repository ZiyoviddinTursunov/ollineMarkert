import React, { useState } from "react";
import "./Navbar.css";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHeart, FaRegStar, FaRegUser } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdLocalMall } from "react-icons/md";
import { TbXboxX } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";

function Navbar({ user, getUser, cartCount,likeCount }) {
  const [showUsers, setShowUsers] = useState(false);
  const navigate = useNavigate();

  const toggleUsers = () => {
    setShowUsers(!showUsers);
  };

  const closeUsers = () => {
    setShowUsers(false);
  };

  return (
    <>
      <nav>
        <div className="summer_nav">
          <div className="container">
            <h4>
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%! ShopNow
            </h4>
            <select>
              <option value="English">English</option>
              <option value="Russia">Russia</option>
              <option value="Uzbek">Uzbek</option>
            </select>
          </div>
        </div>

        <div className="container">
          <div className="logo">
            <NavLink to="/">
              <h1>Exclusive</h1>
            </NavLink>

            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/singUp">Sign Up</NavLink>
              </li>
            </ul>

            <div className="nav_icons">
              <div className="search_nav">
                <input placeholder="What are you looking for?" type="text" />
                <IoSearchOutline />
              </div>
             <div className="likes">
             <Link to={"/like"}>
                <FaRegHeart className="nav_icons1" />
                <span> {likeCount} </span>
              </Link>
             </div>
              <NavLink to={"/Cartpage"}>
                <div className="cardpagss">
                  <AiOutlineShoppingCart className="nav_icons1" />
                  <span>{cartCount}</span>
                </div>
              </NavLink>
              {user?.id && (
                <div className="nav_user1" onClick={toggleUsers}>
                  <FaRegUser className="nav_user" />
                </div>
              )}
            </div>
          </div>
        </div>

        {showUsers && (
          <div className="container">
            <div className={`users ${showUsers ? "show" : ""}`}>
              <div className="user01">
                <span onClick={closeUsers}>
                  <MdLocalMall />
                  My Order
                </span>
                <NavLink to={"/profile"}>
                  <span onClick={closeUsers}>
                    <FaRegUser /> Manage My Account
                  </span>
                </NavLink>
                <span onClick={closeUsers}>
                  <TbXboxX /> My Cancellations
                </span>
                <span onClick={closeUsers}>
                  <FaRegStar /> My Reviews
                </span>
                <span
                  onClick={() => {
                    localStorage.clear();
                    getUser();
                    closeUsers();
                    navigate("/");
                  }}
                >
                  <BiLogOut /> Logout
                </span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
