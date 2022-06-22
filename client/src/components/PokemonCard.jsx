import React from "react";

export default function PokemonCard({ name, image }) {
  return (
    <div>
      <h1>{name}</h1>
      <img src={image} alt={name} />
    </div>
  );
}
