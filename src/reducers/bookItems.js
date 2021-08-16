import * as types from './../contanst/TypeActionBook';

var initialState = [
    {
        book : {
            imageUrl : "",
            subject :"",
        }
    }
];

const myReducer = (state = initialState,action) =>{
    switch (action.type) {
        case types.GET_BOOKITEM_BY_ID:
            state = action.bookitems
            return [...state];
        case types.GET_BOOKITEM_BY_USER:
            state = action.bookitems
            return [...state]
        case types.GET_ALL_BOOKITEM:
            state = action.bookItems
            return [...state]
        default:{
            return state;
        }
            
    }
}

export default myReducer;