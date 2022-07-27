/* eslint-disable  */
import React, { useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  CircularProgress,
  Tooltip
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import DownloadIcon from '@material-ui/icons/Download';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { downloadFileFn, uploadDocument } from '../Utils/finalLicenseUtil';
import PropTypes from 'prop-types';
import { uploadDocumentApi } from '../API/finalLicenseAPI';

const FileUploaderComp = ({
  input: { value, name },
  label,
  imgOnly,
  imgAndPdf,
  meta,
  setField,
  values,
  rowIndex = -1,
  multipleFile,
  tooltipText,
  resetAttachment,
  setUploadLoading
}) => {
  const showRequiredError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;
  const [showFileError, setShowFileError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [downloadLoading, setDownloadLoading] = React.useState(false);
  const hiddenFileInput = React.useRef(null);
  const [uploadedFileName, setUploadedFileName] = React.useState();
  const [errMessage, setErrMessage] = React.useState('يرجى إرفاق هذا الملف');
  let allowedExtensions = [];
  if (!!imgAndPdf) {
    allowedExtensions = ['pdf', 'png', 'jpg', 'jpeg'];
  } else if (!!imgOnly) {
    allowedExtensions = ['png', 'jpg', 'jpeg'];

  } else {
    allowedExtensions = ['pdf', 'png','jpg', 'jpeg', 'docx', 'doc'];

  }
  var multipleFileDocs = [];
  useEffect(() => {
    console.log(`-- FileUploaderComp resetAttachment ${resetAttachment}`);
    console.log(`-- FileUploaderComp multipleFile ${multipleFile}`);
    console.log(`-- FileUploaderComp RowIndex ${name}`);
    console.log(
      `-- FileUploaderComp RowIndex ${rowIndex} ${rowIndex && rowIndex !== -1}`
    );

    !value ? setUploadedFileName('') : setUploadedFileName('تم رفع ملف');

    let docId = '';
    /* if (rowIndex !== -1) {
       if (values) {
         docId = values.customers[rowIndex][name.split('.')[1]];
         console.log(`-- FileUploaderComp RowIndex ${name} ${JSON.stringify(values[name])} ${JSON.stringify(values.customers[rowIndex][name])}`);
       }
     }
     else */
    docId = values ? values[name] : '';

    // console.log(`========================> docId.length: ${docId.length}`)
    if (Array.isArray(docId) && docId.length > 0 && !!docId[0]) {
      // console.log(`========================> docId: ${docId[0]}`)
      setUploadedFileName(
        `تم رفع الملف ${values[`${name}FileName`] ? values[`${name}FileName`] : ''
        } بنجاح`
      );
    }
  }, [resetAttachment]);

  const setDocument = (name, docID, multipleFile, fileName) => {
    if (!multipleFile) {
      setField(name, [docID]);
      setField(`${name}FileName`, fileName);
    } else {
      multipleFileDocs.push(docID);
      setField(name, multipleFileDocs);
      setField(`${name}FileName`, fileName);
    }
  };
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = async (event) => {
    setLoading(true);
    !!setUploadLoading && (setUploadLoading(true))
    const fileUploaded = event.target.files;
    console.log(`--fileUploaded ${JSON.stringify(fileUploaded)}`);
    for (let i = 0; i < fileUploaded.length; i++) {
      console.log('...fileUploaded...', JSON.stringify(fileUploaded[i].name));
      console.log(
        '...fileUploaded :: SIZE: ',
        JSON.stringify(fileUploaded[i].size) <= 1024 * 1024 * 2
      );

      const fileValidation = validateFile(fileUploaded[i], imgOnly, imgAndPdf,allowedExtensions);

      if (fileValidation && !fileValidation.isValid) {


        setShowFileError(true);
        setLoading(false);
        !!setUploadLoading && (setUploadLoading(false))
        setErrMessage(fileValidation.error);
        return;
      }

      setShowFileError(false);
      const buf = await uploadDocument(fileUploaded[i]);
      const response = await uploadDocumentApi(
        encodeURIComponent(fileUploaded[i].name),
        buf
      );

      console.log('...response...', response);
      if (response.status != 200) {
        setShowFileError(true);
        setErrMessage(response?.message?.message?.errorMessageAr);
      } else if (!response?.isSuccessful)
        setErrMessage(response?.message?.message?.errorMessageAr);
      else {
        setUploadedFileName(`تم رفع الملف ${fileUploaded[i].name} بنجاح`);
        setDocument(
          name,
          response.responseBody.data.docID,
          multipleFile,
          fileUploaded[i].name
        );
      }
    }
    event.target.value = '';
    !!setUploadLoading && (setUploadLoading(false))
    setLoading(false);
  };

  return (
    <>
      <TextField
        fullWidth
        label={label}
        name={name}
        onClick={handleClick}
        variant="outlined"
        dir="rtl"
        disabled
        helperText={
          showRequiredError || showFileError
            ? errMessage + (multipleFile ? ' **يمكنك إرفاق أكثر من ملف ' : '')
            : uploadedFileName
              ? uploadedFileName
              : multipleFile && 'يمكنك إرفاق اكثر من ملف'
        }
        error={showRequiredError || showFileError}
        className="custom-field"
        InputProps={{
          endAdornment: (
            <>
            { !tooltipText&&<InputAdornment position="end">
                  <Tooltip title={`الإمتدادات المسموحة (${allowedExtensions}), وأقصى حجم ملف (5 ميجابايت)`} style={{ maxWidth: 'none' }}>
                    <InfoIcon />
                  </Tooltip>
                </InputAdornment>}
              {tooltipText && (
                <InputAdornment position="end">
                  <Tooltip title={tooltipText} style={{ maxWidth: 'none' }}>
                    <InfoIcon />
                  </Tooltip>
                </InputAdornment>
              )}
              {' '}
              <InputAdornment position="end">
                {loading ? (
                  <CircularProgress size="1rem" />
                ) : (
                  <CloudUploadIcon />
                )}
              </InputAdornment>
              {!!value && (
                <InputAdornment position="end">
                  {downloadLoading ? (
                    <CircularProgress size="1rem" />
                  ) : (
                    <DownloadIcon
                      onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        downloadFileFn(
                          setDownloadLoading,
                          'setFalse',
                          value,
                          label
                        );
                      }}
                    />
                  )}
                </InputAdornment>
              )}
            </>
          ),
        }}
      />
      <input
        multiple={multipleFile}
        type="file"
        ref={hiddenFileInput}
        onChange={(event) => {
          handleChange(event);
        }}
        style={{ display: 'none' }}
      />
    </>
  );
};
export default FileUploaderComp;

FileUploaderComp.propTypes = {
  input: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  multipleFile: PropTypes.bool,
  setField: PropTypes.func,
  values: PropTypes.object,
  meta: PropTypes.object,
  tooltipText: PropTypes.string,
  resetAttachment: PropTypes.bool,
  imgOnly: PropTypes.bool,
  imgAndPdf: PropTypes.bool,

  rowIndex: PropTypes.number
};

function validateFile(file, imgOnly, imgAndPdf,allowedExtensions) {
 
  
  console.log('file exe ' + file.name.split('.').pop().toLowerCase())
  const fileExt = file.name.split('.').pop().toLowerCase()
  if (!allowedExtensions.includes(fileExt)) {
    return { isValid: false, error: `امتداد الملف المراد رفعه غير مسموح به, الأمتدادات المسموحة (${allowedExtensions})`};
  } else if (file.size > 1024 * 1024 * 5) {
    return {
      isValid: false,
      error: 'الملف المراد رفعه تجاوز الحد الأقصى (5 ميجابايت)'
    };
  }
}
