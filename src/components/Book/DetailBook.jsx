import React, { Component } from 'react';
import { connect } from 'react-redux';
import {findIndex} from 'lodash';
import './../../css/book.css';
import BookItem from './BookItem';
import * as actions from './../../actions/index';
import BuildIcon from '@material-ui/icons/Build';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';


class DetailBook extends Component {
    state = { 
        bookitems : [],
        book : {
            imageUrl : ""

        }
        
     }

     componentDidMount(){
         // lấy ra id và book từ props
         // kiểm tra xem nó có thỏa mã không
        var {id} = this.props.match.params;
        var {books} = this.props;
        if (books.length < 2){
            var token = JSON.parse(localStorage.getItem("id_token"));
            if(token !== null){
                var {id_token} = token
                var Authorization = `Bearer ${id_token}`;
                this.props.getAllBook(Authorization);
            }
            else{
                alert("you need login to access ");
                this.props.history.push("/login");
            }
        }
        var index = findIndex(books,(book) =>{
            return parseInt(book.id) === parseInt(id);
        });
        if(index !== -1){
            this.setState({
                book : books[index]
            })
          

        }
        this.getAllBookItem(id);
     }
     componentWillReceiveProps(nextProps){
         if(nextProps){
            var {id} = this.props.match.params;
            var {books} = nextProps;
            var index = findIndex(books,(book) =>{
                return parseInt(book.id) === parseInt(id);
            });
            if(index !== -1){
                this.setState({
                    book : books[index]
                })
    
            }

         }
     }

    getAllBookItem = (id) =>{
        var token = JSON.parse(localStorage.getItem("id_token"));
        if(token !== null){
        var {id_token} = token
        var Authorization = `Bearer ${id_token}`;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", Authorization);
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://192.168.0.101:8080/api/book-items/book/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            this.setState({
                bookitems : JSON.parse(result),
            });
        })
        .catch(error => console.log('error', error));
    }
    else{
        this.props.history.push("/login");

    }
        
    }


    render() { 
        var {bookitems,book} = this.state;
       var items = bookitems.map((item,index) =>{
           return <BookItem key = {index} history={this.props.history} item = {item} book = {book}/>
       })
        return ( 
            <div>
                <div className="container">   
                    <div className="row borderRow1">
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div>
                            <img src={book.imageUrl} alt = "anhmonhoc" className="image"/>
                            </div>
                        </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 bordertop">

                            
                            <table className="table table-hover tablecss">
                                <thead>
                                    <tr className="thead">
                                        <th>Stt</th>
                                        <th>Subject</th>
                                        <th>Barcode</th>
                                        <th>Price</th>
                                        <th>Format</th>
                                        <th>Status</th>
                                        <th>Rack</th>
                                        <th><CalendarTodayIcon/>Date Borrowed</th>
                                        <th><CalendarTodayIcon/>Due Date</th>
                                        <th><BuildIcon/></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items}
                                    {bookitems.length === 0 ? <tr><td>không có item nào</td></tr> : null}
                                
                                </tbody>
                            </table>
                            
                            
                           
                           

                
                           
                            
                        </div>
                        
                        
                    </div>
                </div>
                
                
               
            
               
                    

                
            </div>
         );
    }
}

const mapStateToProps = state =>{
    return {
        books : state.books
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return {
        getAllBook : (id_token) =>{
            dispatch(actions.GetAllBookRequest(id_token))
        },
        
    }
}


 
export default connect(mapStateToProps,mapDispatchToProps)(DetailBook);