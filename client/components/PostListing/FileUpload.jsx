const React = require('react');

class FileUpload extends React.Component {
  componentDidMount() {
    const Dropzone = window.Dropzone;
    const dropzone = new Dropzone('#dropzone', { url: '/api/images' });
    dropzone.on('success', (err, res) => {
      this.props.handleFile(res);
    });
  }

  render() {
    return (
      <div id="dropzone" className="dropzone"> </div>
    );
  }
}

FileUpload.propTypes = {
  handleFile: React.PropTypes.func,
};

export default FileUpload;
