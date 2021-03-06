export const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING',
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR',
  };
};

export const heroDeleted = (id) => {
  return {
    type: 'HERO_DELETED',
    payload: id,
  };
};

export const addHero = (hero) => {
  return {
    type: 'ADD_HERO',
    payload: hero,
  };
};

export const filtersFetching = () => {
  return {
    type: 'FILTERS_FETCHING',
  };
};

export const filtersFetched = (filters) => {
  return {
    type: 'FILTERS_FETCHED',
    payload: filters,
  };
};

export const filtersFetchingError = () => {
  return {
    type: 'FILTERS_FETCHING_ERROR',
  };
};

export const changeActiveFilter = (filterName) => {
  return {
    type: 'CHANGE_ACTIVE_FILTER',
    payload: filterName
  };
};
