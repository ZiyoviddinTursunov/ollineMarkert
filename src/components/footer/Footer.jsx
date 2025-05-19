import React from 'react'
import "./Footer.css"
import { MdSend } from 'react-icons/md'

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer_cards">
          <div className="footer_card">
            <h2>Exclusive</h2>
            <p>Subscribe</p>
            <p>Get 10% off your first order</p>
            <div className="footer_input">
              <input placeholder="Enter your email" type="email" />
              <MdSend />
            </div>
          </div>
          <div className="footer_card">
        <h2>Account</h2>
        <p>My Account</p>
        <p>Login / Register</p>
        <p>Cart</p>
        <p>Wishlist</p>
       <p>Shop</p>
          </div>
          <div className="footer_card">
      <h2>Quick Link</h2>
      <p>Privacy Policy</p>
      <p>Terms Of Use</p>
      <p>FAQ</p>
      <p>Contact</p>
          </div>
          <div className="footer_card">
     <h2>Download App</h2>
     <img src="/public/imgs/Frame 720.png" alt="" />
     <img src="/public/imgs/Frame 741.png" alt="" />
          </div>
        </div>
        <p className='cops'>Copyright Rimel 2022. All right reserved</p>
      </div>
    </footer>
  )
}

export default Footer
