import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPage } from "../redux/actions";
import s from "../stylesheets/Paginated.module.css";

export default function Paginated() {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const pokemons = useSelector((state) => state.pokemons);
  const [max, setMax] = useState(40);
  const [min, setMin] = useState(0);
  useEffect(() => {
    setCount(0);
    setMin(0);
    setMax(40);
    dispatch(getPage(0));
  }, [dispatch, pokemons]);
  function handlePrev() {
    if (count - 9 > 0) {
      dispatch(getPage(count - 10));
      setCount(count - 10);
      if (count <= max) setMin(count - 10);
      if (count <= max && count - 10 !== 0) setMax(count + 20);
    }
  }
  function handleNext() {
    if (count + 10 < pokemons.length) {
      dispatch(getPage(count + 10));
      if (min < pokemons.length - 40) setMin(count + 10);
      if (max + 10 < pokemons.length) setMax(count + 40);
      setCount(count + 10);
    }
  }
  function page(page) {
    dispatch(getPage(page));
    if (page < pokemons.length - 40) setMin(page);
    else if (page > pokemons.length - 40) setMin(pokemons.length - 40);
    if (page === 0) setMax(page + 40);
    else if (page + 30 < pokemons.length) setMax(page + 30);
    else if (page + 30 > pokemons.length) setMax(pokemons.length);
    setCount(page);
  }

  return (
    <div className={s.pageCont}>
      <button className={s.nextPrev} value={10} onClick={() => handlePrev()}>
        Prev
      </button>
      {pokemons &&
        pokemons.map((p, i) =>
          i === 0 ? (
            min === 0 || min - max < 40 ? (
              <button
                className={`${s.pageContBtn} ${
                  i === count ? s.currentPage : null
                }`}
                key={i}
                onClick={() => page(i)}
              >
                {i / 10 + 1}
              </button>
            ) : null
          ) : (i + 10) % 10 === 0 ? (
            i >= min ? (
              i <= max ? (
                <button
                  className={`${s.pageContBtn} ${
                    count === i ? s.currentPage : null
                  }`}
                  key={i}
                  onClick={() => page(i)}
                >
                  {i / 10 + 1}
                </button>
              ) : null
            ) : null
          ) : null
        )}
      <button className={s.nextPrev} value={10} onClick={() => handleNext()}>
        Next
      </button>
    </div>
  );
}
