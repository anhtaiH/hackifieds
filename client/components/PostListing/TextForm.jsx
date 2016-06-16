import React from 'react';

const TextForm = (props) => (
  <div>
    <div className="pure-g">
      <div className="pure-u-1 pure-u-md-1-3">
        <label htmlFor="owner-name"><h2>Owner Name</h2></label>
        <input
          id="owner-name"
          name="ownerName"
          placeholder="Enter your name"
          className="pure-u-23-24"
          type="text"
          onChange={props.handleChange}
          required
        />
      </div>
      <div className="pure-u-1 pure-u-md-1-3">
        <label htmlFor="owner-email"><h2>Owner Email</h2></label>
        <input
          id="owner-email"
          name="ownerEmail"
          placeholder="Enter a valid email address"
          className="pure-u-23-24"
          type="email"
          onChange={props.handleChange}
          required
        />
      </div>
      <div className="pure-u-1 pure-u-md-1-3">
        <label htmlFor="address"><h2>Address</h2></label>
        <input
          id="address"
          name="address"
          placeholder="E.g. 944 Market St, San Francisco, CA"
          className="pure-u-23-24"
          type="text"
          onChange={props.handleChange}
          required
        />
      </div>
      <div className="pure-u-1 pure-u-md-1-3">
        <label htmlFor="price"><h2>Monthly Rent</h2></label>
        <input
          id="price"
          name="price"
          placeholder="Enter a reasonable price"
          className="pure-u-23-24"
          type="number"
          min="0"
          onChange={props.handleChange}
          required
        />
      </div>
      <div className="pure-u-1 pure-u-md-1-3">
        <label htmlFor="bathrooms"><h2>Bathrooms</h2></label>
        <input
          id="bathrooms"
          name="bathrooms"
          placeholder="How many bathrooms are there?"
          className="pure-u-23-24"
          type="number"
          min="0"
          step="0.5"
          onChange={props.handleChange}
          required
        />
      </div>
      <div className="pure-u-1 pure-u-md-1-3 pure-checkbox">
        <label htmlFor="Private"><h2>Check if Private</h2></label>
        <input
          id="Private"
          name="private"
          className="pure-u-23-24"
          type="checkbox"
          onChange={props.handleChange}
        />
      </div>
      <div className="pure-u-1 pure-u-md-1-3">
        <label htmlFor="Description"><h2>Description</h2></label>
        <textarea
          placeholder="Write a brief but descriptive and informative
          summary of the room and the house! Try to include things like
          the ammenities, the people living there, atmosphere, nearby
          awesome places, etc..."
          id="Description"
          name="description"
          rows="6"
          className="pure-u-23-24"
          type="text"
          onChange={props.handleChange}
        />
      </div>
    </div>
  </div>
);

TextForm.propTypes = {
  handleChange: React.PropTypes.func,
};

export default TextForm;
