
import * as types from './../contanst/TypeActionUser';
import axios from 'axios'



var user = JSON.parse(localStorage.getItem("user"));

var initialState = user ? user : {}




const myReducer = (state = initialState,action) =>{
    switch(action.type){
        case types.LOGIN:
            login(action.username,action.password);
            return state;
        case types.LOGOUT:
            logout();
            return state;
        case types.GET_USER:
           getUser().then(res =>{
               state = res.data
           })
            return {...state};
        default:{
            return state;
        }

    }
   
}



export default myReducer;


 function login (username,password){
   var myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
   var raw = JSON.stringify({
     "username": username,
     "password": password,
     "rememberMe": false
   });
   
   var requestOptions = {
     method: 'POST',
     headers: myHeaders,
     body: raw,
     redirect: 'follow'
   };
   
   fetch("http://localhost:8080/api/authenticate", requestOptions)
     .then(response => response.text())
     .then(result => {
         console.log(result);
         localStorage.setItem("id_token",result);

         alert("login sussess");
     })
     .catch(error => {
         console.error(error);
         alert("username or password is not exactly")
     });

}

function logout(){
    localStorage.removeItem("id_token");
}

function getUser(){
    var token = JSON.parse(localStorage.getItem("id_token"));
    var {id_token} = token
    var Authorization = `Bearer ${id_token}`;
    var config = {
    method: 'get',
    url: 'http://localhost:8080/api/account',
    headers: { 
        'Authorization': Authorization
    }
    };

    return axios(config).catch(function (error) {
        console.log(error);
        });

}
