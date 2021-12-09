const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
};

export const filters = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FILTERS_FETCHING':
      return {
        ...state,
        filtersLoadingStatus: 'loading',
      };
    case 'FILTERS_FETCHED':
      return {
        ...state,
        filters: payload,
        filtersLoadingStatus: 'idle',
      };
    case 'FILTERS_FETCHING_ERROR':
      return {
        ...state,
        filtersLoadingStatus: 'error',
      };
    case 'CHANGE_ACTIVE_FILTER':
      return {
        ...state,
        activeFilter: payload,
      };
    default:
      return state;
  }
};

