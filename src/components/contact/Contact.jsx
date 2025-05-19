import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import "./Contact.css";

function Contact() {
  return (
    <div className="container">
        <div className="contact-page">
      <div className="breadcrumb">
        <span>Home</span> / <span className="current">Contact</span>
      </div>

      <div className="contact-container">
        <div className="contact-left">
          <div className="contact-box">
            <div className="icon-circle red">
              <FiPhoneCall size={20} />
            </div>
            <h4>Call To Us</h4>
            <p>We are available 24/7, 7 days a week.</p>
            <p className="contact-info">Phone: +8801611122222</p>
          </div>

          <div className="contact-box">
            <div className="icon-circle red">
              <HiOutlineMail size={20} />
            </div>
            <h4>Write To US</h4>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p className="contact-info">Emails: customer@exclusive.com</p>
            <p className="contact-info">Emails: support@exclusive.com</p>
          </div>
        </div>

        <div className="contact-right">
          <div className="form-row">
            <input type="text" placeholder="Your Name *" />
            <input type="email" placeholder="Your Email *" />
            <input type="text" placeholder="Your Phone *" />
          </div>
          <textarea placeholder="Your Message"></textarea>
          <button>Send Message</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Contact;
