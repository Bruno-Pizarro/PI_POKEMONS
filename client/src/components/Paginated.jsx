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
  const [max, setMax] = useState(48);
  const [min, setMin] = useState(0);
  useEffect(() => {
    setCount(0);
    setMin(0);
    setMax(48);
    dispatch(getPage(0));
  }, [dispatch, pokemons]);
  function handlePrev() {
    if (count - 9 > 0) {
      dispatch(getPage(count - 12));
      if (count - 12 < pokemons.length - 48) setMin(count - 12);
      if (count - 12 < pokemons.length - 48 && max - 12 >= 48)
        setMax(count + 24);
      setCount(count - 12);
    }
  }
  function handleNext() {
    if (count + 12 < pokemons.length) {
      dispatch(getPage(count + 12));
      if (min < pokemons.length - 48) setMin(min + 12);
      if (max + 12 <= pokemons.length) setMax(min + 48);
      setCount(count + 12);
    }
  }
  function page(page) {
    dispatch(getPage(page));
    if (page < pokemons.length - 48) setMin(page);
    else if (page > pokemons.length - 40) setMin(pokemons.length - 40);
    if (page === 0) setMax(page + 48);
    else if (page + 36 < pokemons.length) setMax(page + 36);
    else if (page + 36 > pokemons.length) setMax(pokemons.length);
    setCount(page);
  }

  return (
    <div className={s.pageCont}>
      <button className={s.nextPrev} onClick={() => handlePrev()}>
        Prev
      </button>
      {pokemons &&
        pokemons.map((p, i) =>
          i === 0 ? (
            min === 0 || min - max < 48 ? (
              <button
                className={`${s.pageContBtn} ${
                  i === count ? s.currentPage : null
                }`}
                key={i}
                onClick={() => page(i)}
              >
                {i / 12 + 1}
              </button>
            ) : null
          ) : (i + 12) % 12 === 0 ? (
            i >= min ? (
              i <= max ? (
                <button
                  className={`${s.pageContBtn} ${
                    count === i ? s.currentPage : null
                  }`}
                  key={i}
                  onClick={() => page(i)}
                >
                  {i / 12 + 1}
                </button>
              ) : null
            ) : null
          ) : null
        )}
      <button className={s.nextPrev} onClick={() => handleNext()}>
        Next
      </button>
    </div>
  );
}
