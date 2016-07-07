import React from 'react';
import FileUpload from './FileUpload.jsx';
import TextForm from './TextForm.jsx';
import { connect } from 'react-redux';
import request from 'superagent';
import store from '../../redux/store';
import actions from '../../redux/actions';

const AddListing = (props) => (
  <div>
    <form className="pure-form pure-form-stacked">
      <fieldset>
        <legend>Add Listing</legend>
        <FileUpload handleFile={props.handleFileChange} />
        <TextForm
          handleChange={props.handleChange}
        />
        <button
          onClick={props.handleSubmitForm}
          className="pure-button pure-button-primary button-xlarge button-success"
        >Post</button>
      </fieldset>
    </form>
  </div>
);

const mapStateToProps = function mapStateToProps(state) {
  return {
    listings: state.listings,
  };
};

const mapDispatchToProps = (dispatch) => {
  const formState = store.getState().formFields;

  return {
    handleFileChange(fileName) {
      const newPictures = formState.pictures;
      newPictures.push(fileName);
      dispatch(actions.updateForm({ pictures: newPictures }));
    },

    handleChange(event) {
      const target = event.target;
      const isPrivateName = target.name === 'private';
      formState[target.name] = isPrivateName ? target.checked : target.value;
      dispatch(actions.updateForm(formState));
    },

    handleSubmitForm() {
      formState.pictures = JSON.stringify(formState.pictures);
      request
        .post('/api/listings')
        .type('form')
        .send(formState)
        .end((err) => {
          if (err) {
            throw err;
          }
        });
    },
  };
};

AddListing.propTypes = {
  handleFileChange: React.PropTypes.func,
  handleChange: React.PropTypes.func,
  handleSubmitForm: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddListing);
