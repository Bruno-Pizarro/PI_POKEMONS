import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPage } from "../redux/actions";

export default function Paginated() {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const pokemons = useSelector((state) => state.pokemons);
  useEffect(() => {
    dispatch(getPage(0));
  }, [dispatch, pokemons]);
  function handlePrev() {
    if (count - 9 > 0) {
      dispatch(getPage(count - 10));
      setCount(count - 10);
    }
  }
  function handleNext() {
    if (count + 10 < pokemons.length) {
      dispatch(getPage(count + 10));
      setCount(count + 10);
    }
  }
  return (
    <div>
      <button value={10} onClick={() => handlePrev()}>
        Prev
      </button>
      <button value={10} onClick={() => handleNext()}>
        Next
      </button>
    </div>
  );
}
