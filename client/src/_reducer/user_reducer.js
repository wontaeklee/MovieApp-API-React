import {LOGIN_USER} from '../_action/types' 
import {REGISTER_USER} from '../_action/types' 
import {AUTH_USER} from '../_action/types' 

export default function (state = {}, action) {
    
    switch(action.type){
        case LOGIN_USER :
            return{...state, loginSuceess: action.payload}
        break;

        case REGISTER_USER:
            return{...state, register: action.payload}
        break;

        case AUTH_USER:
            return{...state, userData: action.payload}
        break;

        default: 
        return state 
     
    }
}