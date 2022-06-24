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
  GET_PAGINATED,
  CLEAR_FILTER_TYPE,
} from "./actions";

const initialState = {
  allPokemons: [],
  pokemons: [],
  paginated: [],
  filtered: [],
  filterType: [],
  types: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
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
          : state.pokemons;

      return {
        ...state,
        pokemons: sorted,
      };
    case CLEAR_POKEMONS:
      return {
        ...state,
        pokemons: state.allPokemons,
      };
    case GET_API_POKEMONS:
      return {
        ...state,
        pokemons: state.allPokemons.filter((p) => p.id.substring(0, 1) === "a"),
      };
    case GET_DB_POKEMONS:
      return {
        ...state,
        pokemons: state.allPokemons.filter((p) => p.id.substring(0, 1) === "d"),
      };
    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case FILTER_BY_TYPE:
      return {
        ...state,
        pokemons: state.allPokemons.filter((p) =>
          p.types.includes(action.payload)
        ),
      };
    case CLEAR_FILTER_TYPE:
      return {
        ...state,
        pokemons: state.allPokemons,
      };
    case GET_PAGINATED:
      return {
        ...state,
        paginated: state.pokemons.slice(action.payload, action.payload + 10),
      };
    default:
      return state;
  }
}
