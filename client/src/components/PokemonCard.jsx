import React from "react";
import img from "../images/images.js";
import s from "../stylesheets/PokemonCard.module.css";

export default function PokemonCard({ name, image, types }) {
  return (
    <div className={s.cardCont}>
      <h1 className={s.cardName}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h1>
      <img className={s.cardImage} src={image} alt={name} />
      <div className={s.cardTypeCont}>
        {types &&
          types.map((t) => (
            <img className={s.cardImageType} key={t} src={img[t]} alt="" />
          ))}
      </div>
    </div>
  );
}
