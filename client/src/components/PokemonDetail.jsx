import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import img from "../images/images.js";
import { pokemonDetail, clearDetail } from "../redux/actions.js";
import s from "../stylesheets/PokemonDetail.module.css";

export default function PokemonDetail() {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonDetail);
  const { id } = useParams();
  useEffect(() => {
    dispatch(pokemonDetail(id));

    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);
  return (
    <div className={s.cont}>
      <div className={s.info}>
        <h1 className={s.name}>
          {pokemon.name &&
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h1>
        <div className={s.hpCont}>
          <p>{pokemon.hp}</p>
          <img
            className={s.hpImg}
            src="https://opengameart.org/sites/default/files/heart_9.png"
            alt="HP"
          />
        </div>
        <div className={s.featuresCont}>
          <p>
            Attack: <span className={s.features}>{pokemon.attack}</span>
          </p>
          <p>
            Defense: <span className={s.features}>{pokemon.defense}</span>
          </p>
          <p>
            Speed: <span className={s.features}>{pokemon.speed}</span>
          </p>
          <p>
            Height: <span className={s.features}>{pokemon.height}</span>
          </p>
          <p>
            Weight: <span className={s.features}>{pokemon.weight}</span>
          </p>
        </div>
        <div className={s.typeCont}>
          {pokemon.types &&
            pokemon.types.map((t) => (
              <div key={t.id}>
                <p className={s.typeName}>
                  {t.name && t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                </p>
                <img
                  className={s.typeImage}
                  key={t.id}
                  src={img[t.name]}
                  alt={t.name}
                />
              </div>
            ))}
        </div>
      </div>
      <img className={s.pokemonImage} src={pokemon.image} alt={pokemon.name} />
    </div>
  );
}
