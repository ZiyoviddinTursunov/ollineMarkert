import React from "react";
import "./ChackOut.css";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import {
  MdOutlineRadioButtonUnchecked,
  MdRadioButtonChecked,
} from "react-icons/md";

function ChackOut() {
  return (
    <div className="chackOut">
      <div className="container">
        <div className="breadcrumb">
          <span>
            <a href="#">Account</a> / <a href="#">My Account</a> /{" "}
            <a href="#">Product</a> / <i>View Cart</i> / <b>CheckOut</b>
          </span>
        </div>

        <div className="checkout_wrapper">
          {/* Billing Details */}
          <div className="billing_details">
            <h2>Billing Details</h2>
            <form>
              <div className="form_group">
                <label>First Name*</label>
                <input type="text" required />
              </div>
              <div className="form_group">
                <label>Company Name</label>
                <input type="text" />
              </div>
              <div className="form_group">
                <label>Street Address*</label>
                <input type="text" required />
              </div>
              <div className="form_group">
                <label>Apartment, floor, etc. (optional)</label>
                <input type="text" />
              </div>
              <div className="form_group">
                <label>Town/City*</label>
                <input type="text" required />
              </div>
              <div className="form_group">
                <label>Phone Number*</label>
                <input type="text" required />
              </div>
              <div className="form_group">
                <label>Email Address*</label>
                <input type="email" required />
              </div>
              <label className="save_info">
                <input type="checkbox" />
                Save this information for faster check-out next time
              </label>
            </form>
          </div>

          <div className="order_summary">
            <div className="product">
              <img src="/imgs/Frame 611.png" alt="LCD Monitor" />
              <span className="product_name">LCD Monitor</span>
              <span className="product_price">$650</span>
            </div>
            <div className="product">
              <img src="/imgs/Frame 611.png" alt="H1 Gamepad" />
              <span className="product_name">H1 Gamepad</span>
              <span className="product_price">$1100</span>
            </div>

            <div className="summary">
              <div>
                <span>Subtotal:</span>
                <span>$1750</span>
              </div>
              <div className="shopin01">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="total">
                <span>Total:</span>
                <span>$1750</span>
              </div>
            </div>
            <div className="payment_methods">
              <div className="payment_option">
                <label className="payment_option1">
                  <input type="radio" name="payment" value="bank" />
                  Bank
                </label>
                <img src="/imgs/Frame 834.svg" alt="payment icons" />
              </div>

              <label className="payment_option1">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  defaultChecked
                />
                Cash on delivery
              </label>
            </div>

            <div className="coupon">
              <input type="text" placeholder="Coupon Code" />
              <button>Apply Coupon</button>
            </div>

            <button className="place_order">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChackOut;
