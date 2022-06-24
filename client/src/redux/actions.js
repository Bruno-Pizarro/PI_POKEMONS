import axios from "axios";
export const GET_API_POKEMONS = "GET_API_POKEMONS";
export const GET_DB_POKEMONS = "GET_DB_POKEMONS";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";

export const GET_PAGINATED = "GET_PAGEINATED";

export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";

export const CLEAR_POKEMONS = "CLEAR_POKEMONS";
export const FILTER_BY_NAME = "FILTER_BY_NAME";

export const CLEAR_FILTER = "CLEAR_FILTER";
export const CLEAR_FILTER_TYPE = "CLEAR_FILTER_TYPE";
export const SORT_BY = "SORT_BY";

export function getAllPokemons() {
  return function (dispatch) {
    dispatch(clearPokemons());
    return axios.get("http://localhost:3001/pokemon").then((r) => {
      return dispatch({ type: GET_ALL_POKEMONS, payload: r.data });
    });
  };
}

export function clearPokemons() {
  return function (dispatch) {
    dispatch({ type: CLEAR_POKEMONS });
  };
}

export function filterName(name) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/pokemon?name=${name}`)
      .then((r) => {
        return dispatch({ type: FILTER_BY_NAME, payload: r.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function clearFilter() {
  return function (dispatch) {
    dispatch({ type: CLEAR_FILTER });
  };
}

export function sortBy(by) {
  return function (dispatch) {
    dispatch({ type: SORT_BY, payload: by });
  };
}

export function getApiPokemons() {
  return async function (dispatch) {
    dispatch(clearPokemons());
    const response = await axios.get("http://localhost:3001/pokemon/api");
    dispatch({ type: GET_API_POKEMONS, payload: response.data });
  };
}

export function getDBPokemons() {
  return async function (dispatch) {
    dispatch(clearPokemons());
    const response = await axios.get("http://localhost:3001/pokemon/db");
    dispatch({ type: GET_DB_POKEMONS, payload: response.data });
  };
}

export function getAllTypes() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/type");
    dispatch({ type: GET_ALL_TYPES, payload: response.data });
  };
}

export function filterByType(type) {
  return function (dispatch) {
    dispatch({ type: FILTER_BY_TYPE, payload: type });
  };
}

export function clearFilterType() {
  return function (dispatch) {
    dispatch({ type: CLEAR_FILTER_TYPE });
  };
}

export function getPage(n) {
  return function (dispatch) {
    dispatch({ type: GET_PAGINATED, payload: n });
  };
}

export function createPokemon(pokemonBody) {
  return async function (dispatch) {
    axios.post("http://localhost:3001/pokemon", pokemonBody).then((r) => {
      console.log(r.data);
    });
  };
}
