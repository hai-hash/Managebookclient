import React, { Component } from 'react';
import Books from '../../components/Book/Books';
import Book from '../../components/Book/Book';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import {filter} from 'lodash';
import './../../css/book.css';

class BookPages extends Component {
    state = { 
        books : [],
        filter : null,

     }

     componentDidMount(){
        var token = JSON.parse(localStorage.getItem("id_token"));
        if(token !== null){
            var {id_token} = token
            var Authorization = `Bearer ${id_token}`;
            this.props.getAllBook(Authorization);
            this.props.getAllCategory(Authorization);
        }
        else{
            alert("you need login to access ");
            this.props.history.push("/login");
        }
      
     }
    

    DisplayBookItem = (books) =>{
        var result = null;
        if(books.length > 0){
            result = books.map((book,index) =>{
                return <Book match = {this.props.match} key={index} book = {book}/>
            });
        }
        return result;

    }
    filter = (data) =>{
        this.setState({
            filter : data
        })
    }

    render() { 
        var books = this.props.books;
       if(this.state.filter !== null){
           books = filter(books,(book) =>{
               
               return book.catagory != null && book.catagory.id === this.state.filter;
           }) 
       }

       

        return ( 
            <div className="bookpage">
                <Books filter = {this.filter}>
                    {this.DisplayBookItem(books)}
                </Books>

            </div>
         );
    }
}

const mapStateToProp = (state =>{
    return {
        books : state.books
    }

})

const mapDispatchToProps = (dispatch,props) =>{
    return {
        getAllBook : (id_token) =>{
            dispatch(actions.GetAllBookRequest(id_token));
        },
        getAllCategory: (id_token) =>{
            dispatch(actions.GetAllCategoryRequest(id_token))
        }
    }
}

 
export default connect(mapStateToProp,mapDispatchToProps)(BookPages);