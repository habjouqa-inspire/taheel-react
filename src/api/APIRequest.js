/* eslint-disable   */

import axios from 'axios';
import fileDownload from 'js-file-download';

const APIRequest = async ({
    requestBody = {},
    url, queryParams = {},
    method
}) => {
    const response = {
        isSuccessful: true,
        data: {},
        message: ''
    };
    console.log(`----requestBody :: ${JSON.stringify(requestBody)}`);
    console.log(`----url :: ${url}`);
    console.log(`----queryParams :: ${JSON.stringify(queryParams)}`);
    try {
        const headers = {
            'Appian-API-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2YWUxNjY4OC1kMjMxLTRmZTQtYWYyMy0yYjQ5MWUyMjk2NDkifQ.sVfHaN8hSbxpZuuhIjq1Dd9YOEh_ckc2Qk9pCrX_3Sw',
            'Content-Type': 'application/json; charset=utf-8'
        };
        const apiResponse = await axios.post(`https://inspiredemo2.appiancloud.com/suite/webapi/${url}`, requestBody, { headers, params: { ...queryParams } });
        response.responseBody = { ...apiResponse.data };
        console.log(`----apiResponse :: ${JSON.stringify(apiResponse)}`);
        console.log(`----responseresponseBody :: ${JSON.stringify(response.responseBody)}`);

    } catch (err) {
        response.isSuccessful = false;
        console.log(`----requestBody err :: ${JSON.stringify(err.response)}`);
        if (err.response.data.message){
            response.message = err.response.data.message.errorMessageAr;
        }
        console.log(`----apiResponse err.message :: ${response.message}`);
    }
    console.log(`----response============================> :: ${JSON.stringify(response)}`);
    return response;
};
const downloadFileAPI = async ({
    url, queryParams = {}, fileName,
    method
}) => {
    const response = {
        isSuccessful: true,
        data: {},
        message: ''
    };
    try {
        console.log(`----url :: ${url}`);
        console.log(`----queryParams :: ${JSON.stringify(queryParams)}`);
        const headers = {
            'Appian-API-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2YWUxNjY4OC1kMjMxLTRmZTQtYWYyMy0yYjQ5MWUyMjk2NDkifQ.sVfHaN8hSbxpZuuhIjq1Dd9YOEh_ckc2Qk9pCrX_3Sw',
            'Content-Type': 'application/json; charset=utf-8'
        };
        const apiResponse = await axios.get(`https://inspiredemo2.appiancloud.com/suite/webapi/${url}`, { headers, responseType: 'blob', params: { ...queryParams } });
        response.responseBody =  { ...apiResponse.data };
        console.log(`----headers :: ${JSON.stringify(apiResponse.headers)}`);
        fileDownload(apiResponse.data, fileName, apiResponse.headers['content-type']);
    } catch (err) {
        console.log(`----requestBody err :: ${JSON.stringify(err.response)}`);
        throw (err);
    }
    return response;
};



const uploadFileAPI = async ( requestBody, fileName) =>{

    const response = {
        isSuccessful: true,
        data: {},
        message: ''
    };
    console.log('requestBody',requestBody)
    var config = {
      method: 'post',
      url: 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-utilities-uploadDocument-v2',
      headers: { 
        'Appian-API-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2YWUxNjY4OC1kMjMxLTRmZTQtYWYyMy0yYjQ5MWUyMjk2NDkifQ.sVfHaN8hSbxpZuuhIjq1Dd9YOEh_ckc2Qk9pCrX_3Sw',
        'Appian-Document-Name': 'Profile Picture.jpg', 
        'Content-Type': 'text/plain'
      },
      data : requestBody.src
    };
    
    const apiResponse= await axios(config)
    .then(function (result) {
        response.responseBody = result.data;
      console.log(JSON.stringify(result.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    return response
    }

export { downloadFileAPI, APIRequest, uploadFileAPI };
