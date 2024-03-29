import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes, createPokemon, getAllPokemons } from "../redux/actions";
import s from "../stylesheets/CreatePokemon.module.css";

export default function CreatePokemon() {
  const [input, setInput] = useState({
    name: "",
    image: "",
    hp: 1,
    attack: 1,
    defense: 1,
    speed: 1,
    height: 0.2,
    weight: 1,
    type1: "normal",
    type2: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    image: false,
    imgValid:
      "https://i0.wp.com/lacomikeria.com/wp-content/uploads/2020/02/thumb-1920-677583.png",
  });
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const allPokemons = useSelector((state) => state.allPokemons);
  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, [dispatch]);

  function handleOnSubmit(e) {
    e.preventDefault();
    var find = allPokemons.find(
      (p) => p.name.toLowerCase() === input.name.toLowerCase()
    );
    if (find) return alert("The pokemon already exist.");
    if (input.name && input.name.length <= 20) {
      dispatch(createPokemon(input));
      setInput({
        name: "",
        image: "",
        hp: 1,
        attack: 1,
        defense: 1,
        speed: 1,
        height: 0.2,
        weight: 1,
        type1: "normal",
        type2: "",
      });
    } else {
      setErrors({ ...errors, name: true });
    }
  }

  function handleOnChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    if (name === "name") {
      if (value) setErrors({ ...errors, [name]: false });
      if (!value) setErrors({ ...errors, [name]: true });
    } else if (name === "image") {
      if (value) setErrors({ ...errors, image: false, imgValid: value });
      if (!value) setErrors({ ...errors, image: true });
    }
  }

  return (
    <div className={s.container}>
      <form className={s.formCont} onSubmit={(e) => handleOnSubmit(e)}>
        <div className={s.inputCont}>
          <div className={s.divInputs}>
            <input
              maxLength="20"
              type="text"
              name="name"
              value={input.name}
              id="name"
              placeholder="Pokemon name..."
              onChange={(e) => handleOnChange(e)}
              autoComplete="off"
            />
            <span>{errors.name ? "Name is required" : null}</span>
          </div>
          <div className={s.divInputs}>
            <input
              type="text"
              name="image"
              value={input.image}
              placeholder="Image URL..."
              onChange={(e) => handleOnChange(e)}
              autoComplete="off"
            />
            <span>
              {errors.image
                ? null
                : /(https?:\/\/.*\.(?:png|jpg|svg))/.test(errors.imgValid)
                ? null
                : "Image must be an image url"}
            </span>
          </div>
          <span className={s.selSpan}>Select Types:</span>
          <div className={s.firstTypeDiv}>
            <select
              id="types1"
              name="type1"
              value={input.type1}
              onChange={(e) => handleOnChange(e)}
            >
              {types &&
                types.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                  </option>
                ))}
            </select>
            <span className={s.selSpan}>*</span>
          </div>
          <select
            id="types2"
            name="type2"
            value={input.type2}
            onChange={(e) => handleOnChange(e)}
          >
            <option value="">Select second type</option>
            {types &&
              types.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                </option>
              ))}
          </select>
        </div>
        <div className={s.features}>
          <span>Hp: {input.hp}</span>
          <input
            name="hp"
            type="range"
            min="1"
            max="255"
            value={input.hp}
            onChange={(e) => handleOnChange(e)}
          />
          <span>Attack: {input.attack}</span>
          <input
            name="attack"
            type="range"
            min="1"
            max="200"
            onChange={(e) => handleOnChange(e)}
            value={input.attack}
          />
          <span>Defense: {input.defense}</span>
          <input
            name="defense"
            type="range"
            min="1"
            max="250"
            onChange={(e) => handleOnChange(e)}
            value={input.defense}
          />
          <span>Speed: {input.speed}</span>
          <input
            name="speed"
            type="range"
            min="1"
            max="200"
            onChange={(e) => handleOnChange(e)}
            value={input.speed}
          />
          <span>Height: {input.height}m</span>
          <input
            name="height"
            type="range"
            min="0.20"
            max="2.50"
            step="0.01"
            onChange={(e) => handleOnChange(e)}
            value={input.height}
          />
          <span>Weight: {input.weight}kg</span>
          <input
            name="weight"
            type="range"
            min="10"
            max="500"
            onChange={(e) => handleOnChange(e)}
            value={input.weight}
          />
        </div>

        <input className={s.create} type="submit" value="CREATE POKEMON!" />
      </form>
      <div className={s.imageView}>
        {/(https?:\/\/.*\.(?:png|jpg|svg))/.test(input.image) ? (
          <img className={s.img} src={input.image} alt="Custom" />
        ) : (
          "Here you can preview your Pokemon image."
        )}
      </div>
    </div>
  );
}
