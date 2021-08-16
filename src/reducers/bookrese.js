import * as types from './../contanst/TypeActionBook';
import {findIndex} from 'lodash';

var initialState = [];

const myReducer = (state = initialState,action) =>{
    var index = -1;
    switch (action.type) {
        case types.GET_RESE_USERCURREN:
            state = action.bookreses;
            return [...state];
        case types.UPDATE_STATUS_BOOKRESE:
             index = findIndex(state,(bookrese) =>{
                return bookrese.id === action.bookrese.id
            })
         state[index] = action.bookrese;
         return [...state];
        
         case types.DELETE_BOOKRESE_BY_ID:
              index = findIndex(state,(bookrese) =>{
                 return bookrese.id === action.id;
             })
             if ( index !== -1){
                 state.splice(index,1);
             }
             return [...state]

        default:
            return state;
    }
}

export default myReducer;