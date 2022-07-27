import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, Typography, CircularProgress } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { uploadDocumentApi } from 'src/Modules/CenterServices/FinalLicense/API/finalLicenseAPI'

const FileUploader = ({ handleFile, name, label, inputType, fileName,helperText,error }) => {
  const [loading, setLoading] = React.useState(false);
  const hiddenFileInput = React.useRef(null);
  const [uploadedFileName, setUploadedFileName] = React.useState("");

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = async (event) => {
    setLoading(true)
    const fileUploaded = event.target.files;
    for (let i = 0; i < fileUploaded.length; i++) {
      await handleFile(fileUploaded[i], setLoading);
      fileName = fileUploaded[i].name
      setUploadedFileName(`(${fileName})`);
    }
  };

  return (
    <>
      <TextField
        fullWidth
        label={`${label} ${uploadedFileName}`}
        name={name}
        onClick={handleClick}
        variant="outlined"
        dir="rtl"
        disabled
        helperText={helperText}
        error={error}
        className="custom-field"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {loading ? <CircularProgress size="1rem" /> : <CloudUploadIcon />}
            </InputAdornment>
          ),
        }}
      />
      <input
        multiple={inputType}
        type="file"
        ref={hiddenFileInput}
        onChange={(event)=>{handleChange(event)}}
        style={{ display: 'none' }}
      />

    </>
  );
};

export default FileUploader;

FileUploader.propTypes = {
  handleFile: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  inputType: PropTypes.string,
  fileName: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.object,
}
