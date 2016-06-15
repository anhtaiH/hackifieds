import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const listingsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_LISTINGS':
      return Object.assign({}, state, action.listings);

    default:
      return state;
  }
};

const filteredListingsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FILTERED_LISTINGS':
      return Object.assign({}, action.filteredListings);

    default:
      return state;
  }
};

const sessionsReducer = (state = false, action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
      return action.isAuthenticate;

    default:
      return state;
  }
};

const formFieldsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.updateForm);

    default:
      return state;
  }
};

const rootReducer = combineReducers(
  {
    filteredListings: filteredListingsReducer,
    listings: listingsReducer,
    routing: routerReducer,
    isAuthenticated: sessionsReducer,
    formFields: formFieldsReducer,
  }
);

export default rootReducer;
