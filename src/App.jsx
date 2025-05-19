import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/Home";
import SingUp from "./pages/singUp/SingUp.jsx";
import Login from "./pages/home/login/Login.jsx";
import About from "./pages/about/About.jsx";
import Contact from "./components/contact/Contact.jsx";
import Profile from "./components/profile/Profile.jsx";
import CartPage from "./components/cartpage/CartPage.jsx";
import OnePraduct from "./components/onePraduct/OnePraduct.jsx";
import ScrollToTop from "./components/scrolltoTop/ScrollToTop.jsx";
import Catigories from "./pages/catigories/Catigories.jsx";
import { ToastContainer } from "react-toastify";
import ChackOut from "./pages/chackOut/ChackOut.jsx";
import Modal from "./components/modal/Modal.jsx";
import Like from "./pages/liked/Like.jsx";

function App() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [modalInfo, setModalInfo] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [cartData, setCartData] = useState();

  const getData = () => {
    const myHeaders = new Headers();

    if (localStorage.getItem("shopToken")) {
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("shopToken")}`
      );
    }

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://ecommercev01.pythonanywhere.com/product/list/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => console.error(error));
  };

  const getUser = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("shopToken")}`
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://ecommercev01.pythonanywhere.com/user/detail/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setUser(result))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getData();
    getUser();
    getLike();
  }, []);
  useEffect(() => {
    cartPages();
  }, []);

  const closeModal = () => {
    setModalInfo(null);
  };
  const cartPages = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("shopToken")}`
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://ecommercev01.pythonanywhere.com/order/cart-items/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCartData(result);
        console.log(result);

        setCartCount(result?.cart_items?.length);
      })
      .catch((error) => console.error(error));
  };

  const [likeData, setLikeData] = useState();
  const getLike = () => {
    const token = localStorage.getItem("shopToken");
    if (!token) {
      console.warn("Token topilmadi — foydalanuvchi login qilmagan");
      return;
    }
  
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
  
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    fetch("https://ecommercev01.pythonanywhere.com/action/my-wishlist/", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Xatolik: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        setLikeData(result);
        setLikeCount(result.length);
      })
      .catch((error) => {
        console.error("Wishlist yuklanishda xatolik:", error.message);
      });
  };
  

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar
        user={user}
        getUser={getUser}
        cartCount={cartCount}
        likeCount={likeCount}
      />
      {modalInfo && <Modal modalInfo={modalInfo} closeModal={closeModal} />}
      <ToastContainer autoClose={2000} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
            getLike={getLike}
            getData={getData}
              data={data}
              setModalInfo={setModalInfo}
              setLikeCount={setLikeCount}
            />
          }
        />
        <Route path="/singUp" element={<SingUp />} />
        <Route path="/logns" element={<Login getUser={getUser} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/Cartpage"
          element={
            <CartPage
              setCartCount={setCartCount}
              cartPages={cartPages}
              cartData={cartData}
            />
          }
        />
        <Route
          path="/onepraduct/:id"
          element={<OnePraduct data={data} setModalInfo={setModalInfo} />}
        />
        <Route
          path="/categories/:id"
          element={<Catigories setModalInfo={setModalInfo} />}
        />
        <Route path="/chackoute" element={<ChackOut />} />
        <Route path="/like" element={<Like likeData={likeData}   getLike={getLike}
            getData={getData}/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
