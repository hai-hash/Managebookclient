import * as types from './../contanst/TypeActionBook';
var initialState =  [
{
    catagory:{
        id : -1
    }
}
];

const myReducer = (state = initialState,action) =>{
    switch(action.type){
        case types.GET_ALLL_BOOK:
            state = action.books;
            return [...state];
        case types.SEARCH: 
            state = action.books;
            return [...state];

        default:{
            return state;
        }

    }
   
}

export default myReducer;
