import React, { useState } from "react";
import { TbXboxX } from "react-icons/tb";
import "./Modal.css";
import { toast } from "react-toastify";

function Modal({ modalInfo, closeModal }) {

  if (!modalInfo) return null;

  const [product_id, setproduct_id] = useState(modalInfo?.id);
  const [count, setcount] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const addToCart = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("shopToken")}`);

    const properties = {};
    if (selectedColor) properties.color = selectedColor;
    if (selectedSize) properties.size = selectedSize;

    const raw = JSON.stringify({
      product_id: product_id,
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
        toast.success("Mahsulot savatga qo'shildi!");
        closeModal(null); 
        

        if (!result || result.non_field_errors || result.properties) {
          alert("Xatolik: " + JSON.stringify(result));
        }
      })
      .catch((error) => console.error("Xatolik:", error));
  };

  return (
    <div className="Modal" onClick={closeModal}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <div className="modalImage">
          <img
            src={`https://ecommercev01.pythonanywhere.com${modalInfo?.pictures[0]?.file}`}
            alt={modalInfo?.title}
          />
          <button className="readMore">Read more</button>
        </div>

        <div className="modalTitle">
          <TbXboxX onClick={closeModal} className="Close" />
          <h1>{modalInfo?.title}</h1>
          <h3>Price: ${modalInfo?.discount_price}</h3>
          <h3>Discount: {modalInfo?.discount_percent}%</h3>

          {modalInfo?.properties?.color ? (
            <div className="colors">
              {modalInfo.properties.color.map((item, index) => (
                <span
                  key={index}
                  style={{ background: item }}
                  onClick={() => setSelectedColor(item)}
                  className={selectedColor === item ? "active" : ""}
                ></span>
              ))}
            </div>
          ) : null}

          {modalInfo?.properties?.size ? (
            <div className="sizes">
              {modalInfo.properties.size.map((item, index) => (
                <span
                  key={index}
                  onClick={() => setSelectedSize(item)}
                  className={selectedSize === item ? "active" : ""}
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}

          <div className="count">
            <button onClick={() => count > 1 && setcount(count - 1)}>-</button>
            <span>{count}</span>
            <button onClick={() => setcount(count + 1)}>+</button>
          </div>

          <button
            onClick={() => {
              addToCart(); 
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
