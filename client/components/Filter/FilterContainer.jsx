import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import store from '../../redux/store';
import Filter from './Filter.jsx';

const FilterContainer = (props) => (
  <Filter
    {...props}
  />
);

const mapStateToProps = function mapStateToProps(state) {
  return {
    filteredListings: state.filteredListings,
    listings: state.listings,
    options: state.options,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  const listings = store.getState().listings;
  const options = store.getState().options;

  return {
    handleFilterChange(e) {
      const isNamePrivate = e.target.name === 'private';
      options[e.target.name] = isNamePrivate ? e.target.checked : +e.target.value;
      dispatch(actions.updateFilteredListings(options, listings));
    },

    handleClearFilters(e) {
      e.preventDefault();
      dispatch(actions.setFilteredListings(listings));
    },
  };
};

FilterContainer.propTypes = {
  updateFilter: React.PropTypes.func,
  listings: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer);
