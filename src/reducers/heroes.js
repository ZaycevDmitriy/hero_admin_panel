const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

export const heroes = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading',
      };
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: payload,
        heroesLoadingStatus: 'idle',
      };
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };
    case 'HERO_DELETED':
      return {
        ...state,
        heroes: state.heroes.filter(hero => hero.id !== payload),
      };
    case 'ADD_HERO':
      return {
        ...state,
        heroes: [...state.heroes, payload],
      };
    default:
      return state;
  }
};

