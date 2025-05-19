import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Card from "../../components/cards/Card";
import FreeAdd from "../../components/freeAdd/FreeAdd";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { TbXboxX } from "react-icons/tb";

function Home({ data, setModalInfo, setLikeCount,getData,getLike }) {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const [catigories, setCatigories] = useState(null);

  const getCatigoriy = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://ecommercev01.pythonanywhere.com/product/categories/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCatigories(result);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getCatigoriy();
  }, []);


  return (
    <>
     
      <br />
      <hr />
      <div className="home">
        <div className="container">
          <div className="home_title">
            {catigories?.map((item) => {
              return (
                <Link to={`/categories/${item.id}`} key={item.id}>
                  <div className="catigoris_img">
                    <img src={item?.image} alt="" />
                    <h2>{item?.title}</h2>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="home_imgs">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
              className="mySwiper"
            >
              <SwiperSlide>
                <img src="/imgs/home-imgs.png" alt="Slide 1" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/imgs/home-imgs.png" alt="Slide 2" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/imgs/home-imgs.png" alt="Slide 3" />
              </SwiperSlide>
              <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
              </div>
            </Swiper>
          </div>
        </div>
      </div>

      <main className="home_main">
        <section>
          <div className="container">
            <div className="title_neme">
              <div className="title-bar"></div>
              <p className="title-sub">Today's</p>
            </div>
            <div className="flash-sales-container">
              <div className="flash-sales-title">
                <div>
                  <h1 className="title-main">Flash Sales</h1>
                </div>
              </div>

              <div className="flash-sales-timer">
                <div className="timer-block">
                  <p className="timer-label">Days</p>
                  <div className="timer-value">
                    03<span className="colon"> : </span>
                  </div>
                </div>
                <div className="timer-block">
                  <p className="timer-label">Hours</p>
                  <div className="timer-value">
                    23<span className="colon"> : </span>
                  </div>
                </div>
                <div className="timer-block">
                  <p className="timer-label">Minutes</p>
                  <div className="timer-value">
                    19<span className="colon"> : </span>
                  </div>
                </div>
                <div className="timer-block">
                  <p className="timer-label">Seconds</p>
                  <div className="timer-value">56</div>
                </div>
              </div>

              <div className="flash-sales-nav">
                <button className="nav-btn">
                  <FaArrowLeft size={12} />
                </button>
                <button className="nav-btn">
                  <FaArrowRight size={12} />
                </button>
              </div>
            </div>
            <div className="todays_cards">
              <Swiper
                spaceBetween={20}
                slidesPerView={4}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="cardSwiper"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
              >
                {
                  // console.log(data)
                  
                }
                {data?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Card getData={getData} getLike={getLike} item={item} setModalInfo={setModalInfo} setLikeCount={setLikeCount} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="todays_btn">
              <button>View All Products </button>
            </div>
          </div>
        </section>

        <section className="brons01">
          <div className="container">
            <hr />
            <div className="brovnss">
              <span></span>
              <p>Categories</p>
            </div>
            <div className="browers">
              <h1>Browse By Category</h1>
              <div className="ligth-regth">
                <FaArrowLeft className="ligtx" />
                <FaArrowRight className="ligtx" />
              </div>
            </div>
            <div className="brons_cards">
              {catigories?.map((item) => {
                return (
                  <Link to={`/categories/${item.id}`} key={item.id}>
                    <div className="brons_card">
                      <img src={item?.image} alt="" />
                      <h3>{item?.title}</h3>
                    </div>
                  </Link>
                );
              })}

              <hr />
            </div>
          </div>
        </section>

        <section className="best">
          <div className="container">
            <hr />
            <div className="brovnss">
              <span></span>
              <p>This Month</p>
            </div>
            <div className="browers">
              <h1>Best Selling Products</h1>
              <button className="btns">View All</button>
            </div>
            <div className="best_cards">
              <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                loop={true}
                spaceBetween={30}
                coverflowEffect={{
                  rotate: 30,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="bestCardSwiper"
              >
                {data?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Card getData={getData} getLike={getLike} item={item} setModalInfo={setModalInfo} setLikeCount={setLikeCount}/>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="best_imgs">
              <img src="/imgs/Frame 600.png" alt="" />
            </div>
          </div>
        </section>

        <section className="our">
          <div className="container">
            <div className="brovnss">
              <span></span>
              <p>Categories</p>
            </div>
            <div className="browers">
              <h1>Explore Our Products</h1>
              <div className="ligth-regth">
                <FaArrowLeft className="ligtx" />
                <FaArrowRight className="ligtx" />
              </div>
            </div>
            <div className="our_cards">
              {data &&
                Array.isArray(data) &&
                data
                  .slice(8, 16)
                  .map((item, index) => <Card getData={getData} getLike={getLike} key={index} item={item} setModalInfo={setModalInfo} setLikeCount={setLikeCount}/>)}
            </div>

            <div className="todays_btn">
              <button>View All Products </button>
            </div>
          </div>
        </section>

        <section className="arival">
          <div className="container">
            <div className="brovnss">
              <span></span>
              <p>Featured</p>
            </div>
            <div className="browers">
              <h1>New Arrival</h1>
            </div>
            <div className="imgs_aririal">
              <img src="/imgs/Frame 739.png" alt="" />
            </div>
            <FreeAdd />
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
