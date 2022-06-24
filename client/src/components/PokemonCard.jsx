import React from "react";
import img from "../images/images.js";

export default function PokemonCard({ name, image, types }) {
  return (
    <div>
      <h1>{name}</h1>
      <img src={image} alt={name} />
      {types && types.map((t) => <img key={t} src={img[t]} alt="" />)}
    </div>
  );
}
