import React, { Component ,Fragment} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import {findIndex} from 'lodash';
import { Button } from '@material-ui/core';
import * as api from './../../Utils/callapi';
import DeleteIcon from '@material-ui/icons/Delete';
class ItemRegisted extends Component {
    state = { 
        bookItem : {
            status : "",
            user : null,
            book:{
                imageUrl : "",
                subject : "",

            }
           
        }
        
     }
    componentDidMount(){
        var {bookItems,bookrese} = this.props;
        var index = findIndex(bookItems,(bookItem) =>{
            return bookItem.id === bookrese.bookItem.id
        })
        if(index !== -1){
            this.setState({
                bookItem : bookItems[index]
           })
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps){

        var {bookItems,bookrese} = nextProps;
        var index = findIndex(bookItems,(bookItem) =>{
            return bookItem.id === bookrese.bookItem.id
        })
        if(index !== -1){
            this.setState({
                bookItem : bookItems[index]
           })
        }
    }
       
    }

    ChuyenDoi =(n) =>{
        if(n < 9) return `0${n}`;
        else return n;
     }
    onCancel = () =>{
       
        if( window.confirm("bạn có chắc chắn muốn hủy đăng ký không")){
            var {bookrese} = this.props;
            var {bookItem} = this.state;
            const d = new Date();
            var date = `${d.getFullYear()}-${this.ChuyenDoi(d.getMonth() + 1)}-${this.ChuyenDoi(d.getDay() + 1)}`;
            var id = bookrese.id;
            // var data = bookrese;
            // data.status = "CANCELED";
            // this.props.updateStatusInRese(id,data);
            this.props.deleteBookReseById(id);

            bookItem.status = "AVAILABLE";
            bookItem.user = null;
            bookItem.modifiedDate = date;
            if(bookItem.id !== null){
                var token = JSON.parse(localStorage.getItem("id_token"));
                var {id_token} = token
                var Authorization = `Bearer ${id_token}`;
                api.CallApi(`book-items/${bookItem.id}`,"put",bookItem,Authorization).then(res=>{
                    alert("Hủy đăng ký thành công")
                })

            }

           

           


            
        }
       
    }

    displayButtonCacel = (status) =>{
        return status === "WAITING"? <Button variant="contained" color="secondary" onClick={this.onCancel}><DeleteIcon></DeleteIcon></Button> : <Button variant="contained" disabled><DeleteIcon></DeleteIcon></Button>
    }
    render() { 
        var {bookrese} = this.props;
       var {bookItem} = this.state;
       console.log(this.state);
       
        return ( 
            <Fragment>
                 <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-r">
                            <div className="card text-center card-cascade narrower" style={{height : '500px'}}>
                                <div className="view overlay hm-white-slight z-depth-1" >
                                    <img src={bookItem.book.imageUrl} className="img-fluid" alt="" /> 
                                
                                    <div>
                                        <div className="mask waves-light waves-effect waves-light"></div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">
                                        <strong>
                                            <Link to = '/a'>{bookItem.book.subject}</Link>
                                        </strong>
                                    </h4>
                                    <p className="card-text">
                                    {bookrese.status}
                                    </p>
                                    <p className="card-text">
                                   {bookrese.creationDate}
                                    </p>
                                    <div className="card-footer">
                                        <span className="left">{bookrese.bookItem.price} vnđ/ngày</span>
                                        <span className="right">
                                        {this.displayButtonCacel(bookrese.status)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
            </Fragment>
         );
    }
}

const mapStateToProps = state =>{
    return {
        bookItems : state.bookItems
    }
}
const mapDispatchToProps = (dispatch,props) =>{
    return {
        getBookItemById : (id) =>{
            dispatch(actions.getBookItemByIdRequest(id))
        },
        updateStatusInRese : (id,bookrese) =>{
            dispatch(actions.updateStatusInBookReseRequest(id,bookrese))
        },
        deleteBookReseById : (id) =>{
            dispatch(actions.DeleteBookReseByIdRequest(id))
        }
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ItemRegisted);