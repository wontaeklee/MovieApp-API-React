import axios from 'axios'
import {LOGIN_USER} from './types'
import {REGISTER_USER} from './types'
import {AUTH_USER} from './types'



export function loginUser(dataToSubmit){
   
    const requset =  axios.post('/api/users/login', dataToSubmit)
     .then(response => response.data)
 
     return{
         type: LOGIN_USER,
         payload: requset
     }
 }

export function registerUser(dataToSubmit){
   
    const requset =  axios.post('/api/users/register', dataToSubmit)
     .then(response => response.data)
 
     return{
         type: REGISTER_USER,
         payload: requset
     }
 }


 export function auth(){
   
    const requset =  axios.get('/api/users/auth')
     .then(response => response.data)
 
     return{
         type: AUTH_USER,
         payload: requset
     }
 }