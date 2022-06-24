import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes } from "../redux/actions";

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
  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  function handleOnSubmit(e) {
    e.preventDefault();
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
    <div>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <input
          type="text"
          name="name"
          value={input.name}
          id="name"
          placeholder="Pokemon name..."
          onChange={(e) => handleOnChange(e)}
          autoComplete="off"
        />
        <p>{errors.name ? "Name is required" : null}</p>
        <input
          type="text"
          name="image"
          value={input.image}
          placeholder="Image URL..."
          onChange={(e) => handleOnChange(e)}
          autoComplete="off"
        />
        <p>
          {errors.image
            ? "Image is required"
            : /(https?:\/\/.*\.(?:png|jpg|svg))/.test(errors.imgValid)
            ? null
            : "Image must be an image url"}
        </p>
        hp:{input.hp}
        <input
          name="hp"
          type="range"
          min="1"
          max="250"
          value={input.hp}
          onChange={(e) => handleOnChange(e)}
        />
        attack:{input.attack}
        <input
          name="attack"
          type="range"
          min="1"
          max="250"
          onChange={(e) => handleOnChange(e)}
          value={input.attack}
        />
        defense:{input.defense}
        <input
          name="defense"
          type="range"
          min="1"
          max="250"
          onChange={(e) => handleOnChange(e)}
          value={input.defense}
        />
        speed:{input.speed}
        <input
          name="speed"
          type="range"
          min="1"
          max="250"
          onChange={(e) => handleOnChange(e)}
          value={input.speed}
        />
        height:{input.height}m
        <input
          name="height"
          type="range"
          min="0.20"
          max="2.50"
          step="0.01"
          onChange={(e) => handleOnChange(e)}
          value={input.height}
        />
        weight:{input.weight}kg
        <input
          name="weight"
          type="range"
          min="10"
          max="100"
          onChange={(e) => handleOnChange(e)}
          value={input.weight}
        />
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
        <input type="submit" value="CREATE POKEMON!" />
      </form>
    </div>
  );
}
