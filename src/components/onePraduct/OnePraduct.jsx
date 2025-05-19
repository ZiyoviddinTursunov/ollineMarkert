import React, { useEffect, useState } from "react";
import "./OnePraduct.css";
import { FaRegHeart, FaStar } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { BsArrowRepeat } from "react-icons/bs";
import Card from "../cards/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify"; 

function OnePraduct({ data, setModalInfo }) {
  const { id } = useParams();
  const [onePraduct, setOnePraduct] = useState(null);
  const [count, setCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null); 
  const [selectedSize, setSelectedSize] = useState(null); 
  const [maiImg, setMainImg] = useState(null);

  const getData = () => {
    fetch(
      `https://ecommercev01.pythonanywhere.com/product/detail/?product_id=${id}`
    )
      .then((res) => res.json())
      .then((result) => {
        setOnePraduct(result);
      })
      .catch((error) => console.error("Xatolik:", error));
  };

  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    setMainImg(onePraduct?.pictures[0].file);
  }, [onePraduct]);

  const addToCart = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("shopToken")}`);

    const properties = {};
    if (selectedColor) properties.color = selectedColor;
    if (selectedSize) properties.size = selectedSize;

    const raw = JSON.stringify({
      product_id: onePraduct?.id,
      quantity: count,
      ...(Object.keys(properties).length > 0 && { properties }),
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://ecommercev01.pythonanywhere.com/order/add-to-cart/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result?.non_field_errors || result?.properties) {
          alert("Xatolik: " + JSON.stringify(result));
        } else {
          toast.success("Mahsulot savatga qo'shildi!");
        }
      })
      .catch((error) => {
        console.error("Xatolik:", error);
      });
  };

  return (
    <div className="onePraduct">
      <div className="container">
        <div className="onerPraduct_text">
          <span>Account</span>
          <p></p>
          <span>Gaming</span>
          <p></p>
          <span>{onePraduct?.title}</span>
        </div>

        <div className="onePraduc_cards">
          <div className="onePraduc_imgs4">
            {onePraduct?.pictures?.map((item, idx) => (
              <img
                key={idx}
                onClick={() => setMainImg(item?.file)}
                src={`https://ecommercev01.pythonanywhere.com/${item?.file}`}
                alt=""
              />
            ))}
          </div>

          <div className="onePtaduc_imgs">
            <img
              src={`https://ecommercev01.pythonanywhere.com/${maiImg}`}
              alt=""
            />
          </div>

          <div className="onePraduct_card">
            <h2>{onePraduct?.title}</h2>
            <div className="one_stars">
              <div className="stars001">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="stars01" />
                ))}
              </div>
              <span>({onePraduct?.review_quantity} Reviews)</span>
              <p>In Stock</p>
            </div>

            <div className="prices_praduce">
              {onePraduct?.price !== onePraduct?.discount_price ? (
                <>
                  <h2>
                    <del>${onePraduct?.price}</del>
                  </h2>
                  <h2>${onePraduct?.discount_price}</h2>
                </>
              ) : (
                <h2>${onePraduct?.price}</h2>
              )}
            </div>

            <p className="oneText">{onePraduct?.description}</p>
            <p className="border_B"></p>

            {onePraduct?.properties?.color && (
              <div className="one_colors">
                <h3>Colours:</h3>
                {onePraduct.properties.color.map((item, idx) => (
                  <p
                    key={idx}
                    style={{ background: item }}
                    onClick={() => setSelectedColor(item)}
                    className={selectedColor === item ? "active" : ""}
                  ></p>
                ))}
              </div>
            )}

            {onePraduct?.properties?.size && (
              <div className="oneSize">
                <h3>Size</h3>
                {onePraduct.properties.size.map((item, idx) => (
                  <span
                    key={idx}
                    onClick={() => setSelectedSize(item)}
                    className={selectedSize === item ? "active" : ""}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            <div className="one_buy">
              <div className="pilus_minus">
                <span onClick={() => count > 1 && setCount(count - 1)}>-</span>
                <p>{count}</p>
                <span onClick={() => setCount(count + 1)}>+</span>
              </div>
              <button onClick={addToCart}>Add to Cart</button>
              <div className="one_heart">
                <FaRegHeart className="one_hear01" onClick={()=>{
                  
                }}/>
              </div>
            </div>

            <div className="oneFree">
              <div className="one_cart01">
                <TbTruckDelivery className="delivery" />
                <div>
                  <h4>Free Delivery</h4>
                  <p>Enter your postal code for Delivery Availability</p>
                </div>
              </div>
              <hr />
              <div className="one_cart01">
                <BsArrowRepeat className="delivery" />
                <div>
                  <h4>Return Delivery</h4>
                  <p>Free 30 Days Delivery Returns. Details</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="one_block01">
          <div className="oneBox">
            <p></p>
            <h2>Related Items</h2>
          </div>

          <div className="oneBlock">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={2}
              navigation={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="custom-swiper"
            >
              {data?.length > 0 &&
                data.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Card item={item} setModalInfo={setModalInfo} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnePraduct;
