import _ from 'lodash';

const actions = {
  setAuthentication(isAuthenticate) {
    return {
      type: 'AUTHENTICATE',
      isAuthenticate,
    };
  },

  setListings(listings) {
    return {
      type: 'SET_LISTINGS',
      listings,
    };
  },

  setFilteredListings(filteredListings) {
    return {
      type: 'SET_FILTERED_LISTINGS',
      filteredListings,
    };
  },

  updateForm(userInput) {
    return {
      type: 'UPDATE_FORM',
      userInput,
    };
  },

  updateFilteredListings(options, listings) {
    // filter all the listings based on options
    const filteredListings = _.reduce(listings, (acc, curr, key) => {
      const newListings = acc;

      // distanceToHackReactor is an object and the value of miles is a
      // string. We need to parse it to remove anything that is not a
      // number or decimal so that we can compare numbers
      const distance = parseInt(curr.distanceToHackReactor.miles
        .replace(/[^\d|\.]/g, ''), 10);

      // Extend this filter options as we add more filters
      const filterOptions = curr.private === options.private &&
        curr.price <= options.price &&
        distance <= options.distance;

      // Update filteredListings in store
      if (filterOptions) {
        newListings[key] = curr;
      }

      return newListings;
    }, {});

    return {
      type: 'SET_FILTERED_LISTINGS',
      filteredListings,
    };
  },
};

export default actions;
