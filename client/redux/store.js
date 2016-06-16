import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import reducers from './reducers';

const initialState = {
  listings: {},
  filteredListings: {},
  isAuthenticated: false,
  formFields: {
    address: '',
    price: '',
    bathrooms: '',
    private: false,
    ownerName: '',
    ownerEmail: '',
    description: '',
    pictures: [],
  },
  options: {
    price: 2000,
    private: false,
    distance: 8,
  },
};

const store = createStore(reducers, initialState);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
