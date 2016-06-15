import React from 'react';

const TextForm = (props) => (
  <div>
    <div className="pure-g">
      <div className="pure-u-1 pure-u-md-1-3">
        <label htmlFor="owner-name"><h2>Owner Name</h2></label>
        <input
          id="owner-name"
          placeholder="Enter your name"
          className="pure-u-23-24"
          type="text"
          value={props.ownerName}
          onChange={props.handleOwnerNameChange}
          required
        />
      </div>
      <div className="pure-u-1 pure-u-md-1-3">
        <label htmlFor="owner-email"><h2>Owner Email</h2></label>
        <input
          id="owner-email"
          placeholder="Enter a valid email address"
          className="pure-u-23-24"
          type="email"
          value={props.ownerEmail}
          onChange={props.handleOwnerEmailChange}
          required
        />
      </div>
      <div className="pure-u-1 pure-u-md-1-3">
        <label htmlFor="address"><h2>Address</h2></label>
        <input
          id="address"
          placeholder="E.g. 944 Market St, San Francisco, CA"
          className="pure-u-23-24"
          type="text"
          value={props.address}
          onChange={props.handleAddressChange}
          required
        />
      </div>
      <div className="pure-u-1 pure-u-md-1-3">
        <label htmlFor="price"><h2>Monthly Rent</h2></label>
        <input
          id="price"
          placeholder="Enter a reasonable price"
          className="pure-u-23-24"
          type="number"
          min="0"
          value={props.price}
          onChange={props.handlePriceChange}
          required
        />
      </div>
      <div className="pure-u-1 pure-u-md-1-3">
        <label htmlFor="bathrooms"><h2>Bathrooms</h2></label>
        <input
          id="bathrooms"
          placeholder="How many bathrooms are there?"
          className="pure-u-23-24"
          type="number"
          min="0"
          step="0.5"
          value={props.bathrooms}
          onChange={props.handleBathroomsChange}
          required
        />
      </div>
      <div className="pure-u-1 pure-u-md-1-3 pure-checkbox">
        <label htmlFor="Private"><h2>Check if Private</h2></label>
        <input
          id="Private"
          className="pure-u-23-24"
          type="checkbox"
          value={props.private}
          onChange={props.handlePrivateChange}
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
          rows="6"
          className="pure-u-23-24"
          type="text"
          value={props.description}
          onChange={props.handleDescriptionChange}
        />
      </div>
    </div>
  </div>
);

TextForm.propTypes = {
  ownerEmail: React.PropTypes.string,
  ownerName: React.PropTypes.string,
  price: React.PropTypes.string,
  address: React.PropTypes.string,
  bathrooms: React.PropTypes.string,
  description: React.PropTypes.string,
  private: React.PropTypes.bool,

  handleOwnerEmailChange: React.PropTypes.func,
  handlePriceChange: React.PropTypes.func,
  handleAddressChange: React.PropTypes.func,
  handleOwnerNameChange: React.PropTypes.func,
  handleBathroomsChange: React.PropTypes.func,
  handlePrivateChange: React.PropTypes.func,
  handleDescriptionChange: React.PropTypes.func,
};

export default TextForm;
