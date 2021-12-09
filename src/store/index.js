import { combineReducers, compose, applyMiddleware, createStore } from 'redux';
import { filters, heroes } from '../reducers';

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({ type: action });
  } else {
    return next(action);
  }
};

// const enhancer = (createStore) => (...args) => {
//   const store = createStore(...args);
//
//   const oldDispatch = store.dispatch;
//   store.dispatch = (action) => {
//     if (typeof action === 'string') {
//       return oldDispatch({ type: action });
//     } else {
//       return oldDispatch(action);
//     }
//   };
//   return store;
// };

const store = createStore(
                            combineReducers({ heroes, filters }),
                            compose(
                              applyMiddleware(stringMiddleware),
                              window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                              )
                          );

export default store;

