import Home from "./Home/Home";
import NotFound from './NotFound';
import Login from './user/Login';
import About from './About/About';
import * as urls from './../contanst/TypeUrls';
import BookPages from "../pages/BookPages/BookPage";
import DetailBook from './Book/DetailBook';
import Profile from './user/profile';
import Logout from "./user/Logout";
import Cart from './../components/cart/index';
export const routes = [
    {
        path : urls.HOME,
        exact: true,
        content: () => <Home/>
    },
    {
        path : urls.BOOKS,
        exact: true,
        content: ({match,history}) => <BookPages match ={match} history={history}/>
    },
    {
        path : urls.LOGIN,
        exact: false,
        content: ({history}) => <Login history={history}/>
    },
    {
        path : urls.LOGOUT,
        exact: false,
        content: ({history}) => <Logout history = {history}/>
    },
    {
        path : urls.ABOUT,
        exact: false,
        content: () => <About/>
    },
    {
        path : urls.DETAILBOOK,
        exact: false,
        content: ({match,history}) => <DetailBook match={match} history={history}/>
    },
    {
        path : urls.PROFILE,
        exact: false,
        content: ({history}) => <Profile history = {history}/>
    },
    {
        path : urls.CART,
        exact: false,
        content: ({history}) => <Cart history = {history}/>
    },
    {
        path : urls.NOT_FOUND,
        exact: false,
        content: () => <NotFound/>,
    },
   
   
]