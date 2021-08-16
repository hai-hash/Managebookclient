import * as types from './../contanst/TypeActionCategory';
var initialState = [];

const myReducer = (state=initialState,action) =>{
    switch (action.type) {
        case types.GET_ALL_CATEGORY:
            state = action.categorys;
            return state;
        default:
            return state;
    }
}

export default myReducer;