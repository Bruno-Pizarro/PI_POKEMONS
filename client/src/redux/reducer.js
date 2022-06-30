import {
  GET_ALL_POKEMONS,
  GET_API_POKEMONS,
  GET_DB_POKEMONS,
  CLEAR_POKEMONS,
  FILTER_BY_NAME,
  NOT_FOUND,
  GET_PAGINATED,
  GET_ALL,
  FILTER_BY_TYPE,
  SORT_BY,
  GET_ALL_TYPES,
  GET_DETAIL,
  CLEAR_DETAIL,
  CLEAR_ERROR,
} from "./actions";

const initialState = {
  allPokemons: [],
  pokemons: [],
  nonsorted: [],
  pokemonDetail: {},
  paginated: [],
  types: [],
  errorNotFound: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: [...action.payload],
        nonsorted: [...action.payload],
        pokemons: action.payload,
      };
    case FILTER_BY_NAME:
      return {
        ...state,
        pokemons: [action.payload],
      };
    case SORT_BY:
      const sorted =
        action.payload === "a-z"
          ? state.pokemons.sort(function (a, b) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
          : action.payload === "z-a"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            })
          : action.payload === "a-h-t-l"
          ? state.pokemons.sort((a, b) => b.attack - a.attack)
          : action.payload === "a-l-t-h"
          ? state.pokemons.sort((a, b) => a.attack - b.attack)
          : state.nonsorted;

      return {
        ...state,
        pokemons: [...sorted],
      };
    case CLEAR_POKEMONS:
      return {
        ...state,
        pokemons: [],
      };
    case GET_API_POKEMONS:
      const api = state.allPokemons.filter((p) => p.id.substring(0, 1) === "a");
      return {
        ...state,
        pokemons: api,
        nonsorted: [...api],
      };
    case GET_DB_POKEMONS:
      const db = state.allPokemons.filter((p) => p.id.substring(0, 1) === "d");
      return {
        ...state,
        pokemons: db,
        nonsorted: [...db],
      };
    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case FILTER_BY_TYPE:
      const type = state.pokemons.filter((p) =>
        p.types.includes(action.payload)
      );
      return {
        ...state,
        pokemons: type,
        nonsorted: [...type],
      };
    case GET_PAGINATED:
      return {
        ...state,
        paginated: state.pokemons.slice(action.payload, action.payload + 12),
      };
    case GET_ALL:
      return {
        ...state,
        pokemons: [...state.allPokemons],
      };
    case NOT_FOUND:
      return {
        ...state,
        errorNotFound: [...action.payload],
      };
    case CLEAR_ERROR:
      return {
        ...state,
        errorNotFound: [],
      };
    case GET_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        pokemonDetail: [],
      };
    default:
      return state;
  }
}
