import React from "react";
import './Card.css'

export default function Card(props) {

  const {id, src, author} = props;

  return (
    <>
      <div className="card">
        <p>Image Id : {id}</p>
        <img src={src} alt="image" width={280} height={150}/>
        <p>Author: {author}</p>
        <button>Click Me</button>
      </div>
    </>
  );
}
