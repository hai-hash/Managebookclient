import * as types from './../contanst/TypeActionReader';
var initialState = {};

const myReducer = (state=initialState,action) =>{
    switch (action.type) {
        case types.GET_READER_CURREN:
            state = action.readers;
            return {...state};
        case types.ADD_NEW_CURREN:
            state = action.readers;
            localStorage.setItem("reader",JSON.stringify(action.reader));
            return {...state}
        case types.UPDATE_READER_CURREN:
            state = action.reader;
            localStorage.setItem("reader",JSON.stringify(action.reader));
            return {...state}
        default:
            return state;
    }
}

export default myReducer;