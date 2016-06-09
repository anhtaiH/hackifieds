import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import App from './components/App.jsx';
import ListingsContainer from './components/Listings/ListingsContainer.jsx';
import AddListing from './components/AddListing.jsx';

import { Router, Route } from 'react-router';
import store, { history } from './redux/store';


const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} >
        <Route path="/listings" component={ListingsContainer} />
        <Route path="/add-listing" component={AddListing} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('app'));