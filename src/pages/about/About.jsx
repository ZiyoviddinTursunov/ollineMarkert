import React from 'react'
import "./About.css"
import { CiTwitter } from 'react-icons/ci'
import { IoLogoInstagram } from 'react-icons/io'
import { FaLinkedinIn } from 'react-icons/fa'
import FreeAdd from '../../components/freeAdd/FreeAdd'
function About() {
  return (
    <>
        <div className="about">
            <div className="container">
                <p className='aboutP'> Home <span>About</span></p>
                <div className="about_cards">
                    <div className="about_text">
                        <h1>Our Story</h1>
                        <p>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
                        <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
                    </div>
                    <div className="about_card">
                        <img src="/public/imgs/Side Image01.png" alt="" />
                    </div>
                </div>
                <div className="block_about">
                    <div className="block_box">
                      <div className="image_box">
                      <img src="/public/imgs/icon_shop.svg" alt="" />
                      </div>
                        <h1>10.5k </h1>
                        <p>Sallers active our site</p>
                    </div>
                    <div className="block_box">
                      <div className="image_box">
                      <img src="/public/imgs/icon_shop1.svg" alt="" />
                      </div>
                        <h1> 33k</h1>
                        <p>Mopnthly Produduct Sale</p>
                    </div>
                    <div className="block_box">
                      <div className="image_box">
                      <img src="/public/imgs/icon_shop2.svg" alt="" />
                      </div>
                        <h1> 45.5k</h1>
                        <p>Customer active in our site</p>
                    </div>
                    <div className="block_box">
                      <div className="image_box">
                      <img src="/public/imgs/icon_shop3.svg" alt="" />
                      </div>
                        <h1>25k </h1>
                        <p>Anual gross sale in our site</p>
                    </div>
                </div>
                <div className="funder_cards">
                    <div className="funder_card">
                        <img src="/public/imgs/Frame 874.png" alt="" />
                        <h1>Tom Cruise</h1>
                        <p>Founder & Chairman</p>
                        <div className="fragma_icons">
                        <CiTwitter className='fragma_icons01'/>
                        <IoLogoInstagram className='fragma_icons01'/>
                        <FaLinkedinIn className='fragma_icons01'/>
                        </div>
                    </div>
                    <div className="funder_card">
                        <img src="/public/imgs/Frame 875.png" alt="" />
                        <h1>Emma Watson</h1>
                        <p>Managing Director</p>
                        <div className="fragma_icons">
                        <CiTwitter className='fragma_icons01'/>
                        <IoLogoInstagram className='fragma_icons01'/>
                        <FaLinkedinIn className='fragma_icons01'/>
                        </div>
                    </div>
                    <div className="funder_card">
                        <img src="/public/imgs/Frame 876.png" alt="" />
                        <h1>Will Smith</h1>
                        <p>Product Designer</p>
                        <div className="fragma_icons">
                        <CiTwitter className='fragma_icons01'/>
                        <IoLogoInstagram className='fragma_icons01'/>
                        <FaLinkedinIn className='fragma_icons01'/>
                        </div>
                    </div>
                    
                </div>
                <div className="deliveri">
                <FreeAdd/>
                </div>
            </div>
        </div>
    </>
  )
}

export default About