import React from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa6";
import { LiaEyeSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { TbXboxX } from "react-icons/tb";
import "./Card.css";

function Card({ item, setModalInfo, setLikeCount,getData,getLike,likes }) {
  const addLiked = (id) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("shopToken")}`
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://ecommercev01.pythonanywhere.com/action/add-to-wishlist/?product_id=${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setLikeCount(result?.cart_items?.length || 0);
        getData(getData)
        getLike()
      })
      .catch((error) => console.error(error));
  };
  const detaliLike = (id) => {
    const shopToken = localStorage.getItem("shopToken");
  
    if (!shopToken) {
      alert("Iltimos, tizimga kiring.");
      return;
    }
  
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${shopToken}`);
  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
  
    fetch(`https://ecommercev01.pythonanywhere.com/action/remove-from-wishlist/?product_id=${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        getData();  
        getLike();  
      })
      .catch((error) => console.error(error));
  };
  
  const getInfo = (id) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://ecommercev01.pythonanywhere.com/product/detail/?product_id=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setModalInfo(result);
      })
      .catch((error) => console.error(error));
  };
  return (
    <Link to={`/onepraduct/${item.id}`}>
      <div className="card">
        <div className="imgs">
          {item?.discount_percent != null &&
            item?.price !== item?.discount_price && (
              <div className="chegirma">
                <span>- {item?.discount_percent} %</span>
              </div>
            )}
          <div className="card_icons">
            {
              likes?  <FaHeart className="card_icons02" onClick={(e)=>{
                e.preventDefault();
                detaliLike(item?.id)
              }}/>: <>
        
              {
                  item?.is_liked?  
                  <FaHeart className="card_icons02" onClick={(e)=>{
                    e.preventDefault();
                    detaliLike(item?.id)
                  }}/> : <FaRegHeart
                  onClick={(e) => {
                    e.preventDefault();
                    addLiked(item?.id);
                  }}
                  className="card_icons1"
                /> 
              
                }
              </>
            }
       
            
           
            <LiaEyeSolid className="card_icons1" />
          </div>

          <img
            src={`https://ecommercev01.pythonanywhere.com${item?.pictures[0]}`}
            alt={item?.title}
          />
          <div
            onClick={(e) => {
              e.preventDefault();
              getInfo(item?.id);
            }}
            className="cardAdd"
          >
            <h3>Add To Cart</h3>
          </div>
        </div>

        <div className="card_title">
          <h3>
            {item?.title?.length > 25
              ? item?.title.slice(0, 20) + "..."
              : item?.title}
          </h3>
          <span className="price_card">
            $ {item?.discount_price}
            {item?.price !== item?.discount_price && <p>$ {item?.price}</p>}
          </span>

          <div className="card_stars">
            <FaStar className="card-star-icon" />
            <FaStar className="card-star-icon" />
            <FaStar className="card-star-icon" />
            <FaStar className="card-star-icon" />
            <FaStar className="card-star-icon" />
            (85)
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
