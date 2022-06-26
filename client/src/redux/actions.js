import axios from "axios";

//==============================================
//==============ACTION TYPES====================
//==============================================

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_API_POKEMONS = "GET_API_POKEMONS";
export const GET_DB_POKEMONS = "GET_DB_POKEMONS";
export const CLEAR_POKEMONS = "CLEAR_POKEMONS";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const NOT_FOUND = "NOT_FOUND";
export const CLEAR_ERROR = "CLEAR_ERROR";

export const GET_DETAIL = "GET_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";

export const GET_PAGINATED = "GET_PAGEINATED";

export const GET_ALL = "GET_ALL";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const SORT_BY = "SORT_BY";

export const GET_ALL_TYPES = "GET_ALL_TYPES";

//==============================================
//=================Pokemons=====================
//==============================================

export function getAllPokemons() {
  return function (dispatch) {
    dispatch(clearPokemons());
    return axios.get("http://localhost:3001/pokemon").then((r) => {
      return dispatch({ type: GET_ALL_POKEMONS, payload: r.data });
    });
  };
}

export function getApiPokemons() {
  return async function (dispatch) {
    dispatch(clearPokemons());
    dispatch({ type: GET_API_POKEMONS });
  };
}

export function getDBPokemons() {
  return async function (dispatch) {
    dispatch(clearPokemons());
    dispatch({ type: GET_DB_POKEMONS });
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
        dispatch(clearPokemons());
        return dispatch({ type: NOT_FOUND, payload: err.message });
      });
  };
}

export function clearError() {
  return function (dispatch) {
    dispatch({ type: CLEAR_ERROR });
  };
}

export function pokemonDetail(id) {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/pokemon/${id}`).then((r) => {
      return dispatch({ type: GET_DETAIL, payload: r.data });
    });
  };
}

export function clearDetail() {
  return function (dispatch) {
    dispatch({ type: CLEAR_DETAIL });
  };
}

//=================Create======================

export function createPokemon(pokemonBody) {
  return async function (dispatch) {
    axios.post("http://localhost:3001/pokemon", pokemonBody).then((r) => {
      console.log(r.data);
    });
  };
}

//==============================================
//=================Filters======================
//==============================================

export function applyFilters(filters) {
  return async function (dispatch) {
    if (filters.from === "all") dispatch(noFilter("filters"));
    else if (filters.from === "api") dispatch(getApiPokemons());
    else if (filters.from === "db") dispatch(getDBPokemons());
    if (filters.types !== "all") dispatch(filterByType(filters.types));
    if (filters.order !== "all") dispatch(sortBy(filters.order));
  };
}

export function noFilter(from) {
  return function (dispatch) {
    dispatch(clearPokemons());
    if (from === "filters") dispatch({ type: GET_ALL });
    if (from === "search") dispatch({ type: GET_ALL });
  };
}

export function filterByType(type) {
  return function (dispatch) {
    dispatch({ type: FILTER_BY_TYPE, payload: type });
  };
}

export function sortBy(by) {
  return function (dispatch) {
    dispatch({ type: SORT_BY, payload: by });
  };
}

export function getPage(n) {
  return function (dispatch) {
    dispatch({ type: GET_PAGINATED, payload: n });
  };
}

//==============================================
//=================Types========================
//==============================================
export function getAllTypes() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/type");
    dispatch({ type: GET_ALL_TYPES, payload: response.data });
  };
}
