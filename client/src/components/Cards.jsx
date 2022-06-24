import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../redux/actions";
import PokemonCard from "./PokemonCard";

export default function Cards() {
  const dispatch = useDispatch();
  const paginated = useSelector((state) => state.paginated);
  const filtered = useSelector((state) => state.filtered);
  const filterType = useSelector((state) => state.filterType);
  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);
  return (
    <div>
      {paginated.length > 0 ? (
        filtered.length > 0 ? (
          filtered.map((p) => (
            <PokemonCard
              key={p.id}
              name={p.name}
              types={p.types}
              image={p.image}
            />
          ))
        ) : filterType.length > 0 ? (
          filterType.map((p) => (
            <PokemonCard
              key={p.id}
              name={p.name}
              types={p.types}
              image={p.image}
            />
          ))
        ) : (
          paginated.map((p) => (
            <PokemonCard
              key={p.id}
              name={p.name}
              types={p.types}
              image={p.image}
            />
          ))
        )
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
