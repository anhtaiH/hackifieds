import React from 'react';
import FileUpload from './FileUpload.jsx';
import TextForm from './TextForm.jsx';
import request from 'superagent';
import store from '../../redux/store';
import actions from '../../redux/actions';

const formState = store.getState().formFields;

const handleFileChange = (fileName) => {
  const newPictures = formState.pictures;
  newPictures.push(fileName);
  store.dispatch(actions.updateForm({ pictures: newPictures }));
};

const handlePrivateChange = (event) => {
  store.dispatch(actions.updateForm({ private: event.target.checked }));
};

const handleChange = (event) => {
  formState[event.target.name] = event.target.value;
  store.dispatch(actions.updateForm(formState));
};

const handleSubmitForm = () => {
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
};

const AddListing = () => (
  <div>
    <form className="pure-form pure-form-stacked">
      <fieldset>
        <legend>Add Listing</legend>
        <FileUpload handleFile={handleFileChange} />
        <TextForm
          handleChange={handleChange}
          handlePrivateChange={handlePrivateChange}
        />
        <button
          onClick={handleSubmitForm}
          className="pure-button pure-button-primary button-xlarge button-success"
        >Post</button>
      </fieldset>
    </form>
  </div>
);

export default AddListing;
