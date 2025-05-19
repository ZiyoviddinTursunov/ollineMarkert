import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
function CartPage({ setCartCount, cartPages,cartData }) {
 


  const delet = (id) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("shopToken")}`
    );

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://ecommercev01.pythonanywhere.com/order/remove-from-cart?cart_item_id=${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        cartPages();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="container">
        <div className="cart-page">
          <nav className="breadcrumb">
            Home / <span className="breadcrumb-current">Cart</span>
          </nav>

          <div className="cart-table-wrapper">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartData?.cart_items?.map((item) => {
                  return (
                    <tr>
                      <td className="product-cell">
                        <img
                          src={`https://ecommercev01.pythonanywhere.com${item?.pictures[0].file}`}
                          alt="LCD Monitor"
                          className="product-img"
                        />
                        {item?.title}
                      </td>
                      <td>$ {item?.price}</td>
                      <td>
                        <input
                          type="number"
                          className="quantity-input"
                          min="1"
                          max="99"
                          defaultValue={item?.quantity}
                        />
                      </td>
                      <td>$ {item?.price * item?.quantity}</td>
                      <td>
                        <button className="pageDelete"
                          onClick={() => {
                            delet(item?.id);
                          }}
                        >
                          <MdOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="shop-buttons">
            <button className="outline-btn">Return To Shop</button>
            <button className="outline-btn">Update Cart</button>
          </div>
          <div className="cart-bottom">
            <div className="cart-actions">
              <div className="coupon-form">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="coupon-input"
                />
                <button className="apply-btn">Apply Coupon</button>
              </div>
            </div>

            <div className="cart-summary">
              <h2>Cart Total</h2>
              <div className="summary-line">
                <span>Subtotal:</span>
                <span>$1750</span>
              </div>
              <div className="summary-line">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-total">
                <span>Total:</span>
                <span>$1750</span>
              </div>
              <Link to={"/chackoute"}>
                {" "}
                <button className="checkout-btn">Proceed to checkout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
