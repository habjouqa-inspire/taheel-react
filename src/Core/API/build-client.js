import axios from 'axios';

export default ({ req }) => {
 
    // We must be on the browser
    return axios.create({
      baseUrl: `https://${process.env.REACT_APP_APPIAN_URL}/`
    });
 
};
