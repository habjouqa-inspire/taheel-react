/* eslint-disable */
import axios from 'axios';
import { useState } from 'react';

export default ({
  url,
  method,
  body,
  onSuccess
}) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (requestBody = null) => {
    try {
      setErrors(null);
      console.log(body + method);
      const headers = {
        'Appian-API-Key': process.env.REACT_APP_APPIAN_API_KEY
      };
      const response = await axios.post(url, requestBody, { headers });

      if (onSuccess) {
        setErrors(null);
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <ul className="my-0">
            {JSON.stringify(err)}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
