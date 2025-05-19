import React, { useState } from "react";
import Card from "../../components/cards/Card";
import "./Like.css"
function Like({ likeData,  getLike,
  getData }) {
  const [likes,setLikes]=useState(true)

  return (
    <>
      <div className="like">
      <div className="container">
        {likeData?.map((item) => {

          return <Card item={item} likes={likes}   getLike={getLike}
          getData={getData}/>;
        })}
      </div>
      </div>
    </>
  );
}

export default Like;
