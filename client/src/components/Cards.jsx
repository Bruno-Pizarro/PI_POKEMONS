import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../redux/actions";
import PokemonCard from "./PokemonCard";

export default function Cards() {
  const dispatch = useDispatch();
  const paginated = useSelector((state) => state.paginated);
  const errorNotFound = useSelector((state) => state.errorNotFound);
  const [load, setLoad] = useState("");

  useEffect(() => {
    dispatch(getAllPokemons());
    setLoad(
      <img
        src="https://c.tenor.com/fSsxftCb8w0AAAAd/pikachu-running.gif"
        alt="Loading"
      />
    );
  }, [dispatch]);

  function search() {
    setTimeout(() => {
      if (paginated.length <= 0)
        setLoad(
          <img
            src="https://c.tenor.com/kMkgKTD1s_AAAAAC/no-pikachu.gif"
            alt="Not Found"
          />
        );
    }, 8000);
  }
  search();
  return (
    <div>
      {paginated.length > 0 ? (
        paginated.map((p) => (
          <PokemonCard
            key={p.id}
            name={p.name}
            types={p.types}
            image={p.image}
          />
        ))
      ) : errorNotFound.length === 0 ? (
        <span>{load}</span>
      ) : (
        <span>{load}</span>
      )}
    </div>
  );
}
