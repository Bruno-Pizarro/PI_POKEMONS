import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../redux/actions";
import PokemonCard from "./PokemonCard";
import Paginated from "./Paginated";
import s from "../stylesheets/Cards.module.css";

export default function Cards() {
  const dispatch = useDispatch();
  const paginated = useSelector((state) => state.paginated);
  const errorNotFound = useSelector((state) => state.errorNotFound);
  const [load, setLoad] = useState("");

  useEffect(() => {
    dispatch(getAllPokemons());
    setLoad(
      <img
        className={s.loading}
        src="https://64.media.tumblr.com/tumblr_m309yzdquq1qc3fjso1_500.gifv"
        alt="Loading"
      />
    );
    return () => {
      setLoad("");
    };
  }, [dispatch]);

  function search() {
    setTimeout(() => {
      if (paginated.length <= 0)
        setLoad(
          <img
            className={s.notFound}
            src="https://c.tenor.com/kMkgKTD1s_AAAAAC/no-pikachu.gif"
            alt="Not Found"
          />
        );
    }, 10000);
  }
  search();
  return (
    <div className={s.container}>
      <Paginated />
      <div className={s.cardsCont}>
        {paginated.length > 0 ? (
          paginated.map((p) => (
            <Link className={s.link} key={p.id} to={`home/pokemon/${p.id}`}>
              <PokemonCard
                key={p.id}
                name={p.name}
                types={p.types}
                image={p.image}
              />
            </Link>
          ))
        ) : errorNotFound.length === 0 ? (
          <span>{load}</span>
        ) : (
          <span>{load}</span>
        )}
      </div>
    </div>
  );
}
