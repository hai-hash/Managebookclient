import { combineReducers } from "redux";
import book from './book';
import user from './user';
import bookrese from './bookrese';
import bookItems from './bookItems';
import reader from './reader';
import category from './category';
const myReducer = combineReducers({
    books : book,
    user : user,
    bookreses : bookrese,
    bookItems ,
    reader,
    categorys : category,
 
});


export default myReducer;