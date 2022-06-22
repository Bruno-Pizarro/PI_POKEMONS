import {
  GET_ALL_POKEMONS,
  CLEAR_POKEMONS,
  GET_API_POKEMONS,
  GET_ALL_TYPES,
  GET_DB_POKEMONS,
  FILTER_BY_NAME,
  CLEAR_FILTER,
  FILTER_BY_TYPE,
  SORT_BY,
} from "./actions";

const initialState = {
  pokemons: [],
  filtered: [],
  types: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case FILTER_BY_NAME:
      return {
        ...state,
        filtered: [action.payload],
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: [],
      };
    case SORT_BY:
      const allPokemons = state.pokemons;
      const sorted =
        action.payload === "a-z"
          ? allPokemons.sort(function (a, b) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
          : action.payload === "z-a"
          ? allPokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            })
          : action.payload === "a-h-t-l"
          ? allPokemons.sort((a, b) => b.attack - a.attack)
          : action.payload === "a-l-t-h"
          ? allPokemons.sort((a, b) => a.attack - b.attack)
          : allPokemons;
      return {
        ...state,
        pokemons: sorted,
      };
    case CLEAR_POKEMONS:
      return {
        ...state,
        pokemons: [],
      };
    case GET_API_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case GET_DB_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case FILTER_BY_TYPE:
      return {
        ...state,
        pokemons: state.pokemons.filter((p) => p.type.includes(action.payload)),
      };
    default:
      return state;
  }
}
