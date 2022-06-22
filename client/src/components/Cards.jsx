import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../redux/actions";
import PokemonCard from "./PokemonCard";

export default function Cards() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const filtered = useSelector((state) => state.filtered);
  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);
  return (
    <div>
      {pokemons.length > 0 ? (
        filtered.length > 0 ? (
          filtered.map((p) => (
            <PokemonCard key={p.id} name={p.name} image={p.image} />
          ))
        ) : (
          pokemons.map((p) => (
            <PokemonCard key={p.id} name={p.name} image={p.image} />
          ))
        )
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
