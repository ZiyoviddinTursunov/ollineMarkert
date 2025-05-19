import React, { useEffect, useState } from "react";
import "./Catigories.css";
import Card from "../../components/cards/Card";
import { useParams } from "react-router-dom";

function Catigories({setModalInfo}) {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(`https://ecommercev01.pythonanywhere.com/product/list/?category_id=${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setProducts(result);
      })
      .catch(error => console.error(error));

    fetch("https://ecommercev01.pythonanywhere.com/product/categories/", requestOptions)
      .then(response => response.json())
      .then(categories => {
        const found = categories.find(cat => String(cat.id) === id);
        if (found) setCategoryTitle(found.title);
      })
      .catch(error => console.error(error));
  }, [id]);

  return (
 <>
<div className="catigoris">
<div className="container">
      <h1>{categoryTitle ? `Category: ${categoryTitle}` : "Loading..."}</h1>
      <div className="catigoris_cards">
        {products?.length > 0 ? (
          products?.map((item, index) => (
            <Card key={index} item={item} setModalInfo={setModalInfo} />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
</div>
 </>
  );
}

export default Catigories;
