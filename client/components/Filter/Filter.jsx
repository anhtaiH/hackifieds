import React from 'react';

const Filter = (props) => (
  <div>
    <br /><br />
    <form className="pure-form pure-form-stacked">
      <fieldset>

        <legend className="is-center">
          <h1>The Hacker Space</h1>
        </legend>

        <div className="pure-g">
          <div className="pure-u-1 pure-u-md-1-3">
            <label><h2>Max Price</h2></label>
            <input
              type="text"
              name="price"
              onChange={props.handleFilterChange}
              className="pure-u-23-24"
              value={props.options.price}
            />
          </div>

          <div className="pure-u-1 pure-u-md-1-3">
            <label>
              <h2>Distance (Miles) to Hack Reactor</h2>
            </label>

            <input
              type="text"
              name="distance"
              onChange={props.handleFilterChange}
              className="pure-u-23-24"
              value={props.options.distance}
            />
          </div>

          <div className="pure-u-1 pure-u-md-1-3">
            <label >
              <h2>Filter private rooms</h2>
            </label>
            <input
              id="private"
              type="checkbox"
              name="private"
              onChange={props.handleFilterChange}
              className="pure-u-23-24 pure-checkbox"
              value={props.options.private}
            />
            <label><i /></label>
          </div>

          <div className="pure-u-1 pure-u-md-1">
            <input
              type="button"
              name="clear-filters"
              onClick={props.handleClearFilters}
              className="pure-button"
              value="Clear filters"
            />
          </div>

        </div>

      </fieldset>
    </form>
  </div>
);

Filter.propTypes = {
  options: React.PropTypes.object,
  private: React.PropTypes.bool,
  price: React.PropTypes.string,
  handleFilterChange: React.PropTypes.func,
  handleClearFilters: React.PropTypes.func,
};

export default Filter;
