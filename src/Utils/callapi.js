import axios from 'axios';
import * as types from './../contanst/TypeApi';


export const CallApi = (url,method,data,Authorization) =>{
    var config = {
    method: method,
    url: `${types.URL}/${url}`,
    headers: { 
        'Authorization': Authorization,
        'Content-Type': 'application/json'
    },
    data : data
    };

   return axios(config).catch(function (error) {
    console.log(error);
    });
}