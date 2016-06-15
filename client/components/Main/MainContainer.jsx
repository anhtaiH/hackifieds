import React, { Component } from 'react';
import Main from './Main.jsx';
import { connect } from 'react-redux';
import store from '../../redux/store';
import actions from '../../redux/actions';
import api from '../../api.js';
import _ from 'lodash';

class MainContainer extends Component {

  componentWillMount() {
    this.getListings();
  }

  getListings() {
    api.getListings()
      .then(response => {
        _.each(response.data, (item) => {
          const listing = item;

          // Converts part of the listings back to valid javascript types
          listing.pictures = JSON.parse(listing.pictures);
          listing.lat = JSON.parse(listing.lat);
          listing.lng = JSON.parse(listing.lng);
          listing.price = JSON.parse(listing.price);
          listing.distanceToHackReactor = JSON.parse(listing.distanceToHackReactor);
          listing.bathrooms = JSON.parse(listing.bathrooms);
        });

        store.dispatch(actions.setListings(response.data));
        store.dispatch(actions.setFilteredListings(response.data));
      });
  }

  render() {
    return (
      <Main {...this.props} />
    );
  }
}

const mapStateToProps = function mapStateToProps(state) {
  return {
    listings: state.listings,
    filteredListings: state.filteredListings,
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = function mapDispatchToProps(/* dispatch */) {
  // you can 'dispatch' an action here based on the listing being clicked
  return {
    onClick: () => { console.log('Listing was clicked'); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
