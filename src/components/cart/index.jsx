
import React, { Component,Fragment } from 'react';
import Registed from './Registed';
import * as actions from './../../actions/index';
import { connect } from 'react-redux'

class Cart extends Component {
    state = {  }

    componentDidMount(){
        var token = JSON.parse(localStorage.getItem("id_token"));
        if(token !== null){
        var reader = localStorage.getItem("reader");
        if(reader !== "khongco"){
        var {id_token} = token
        var Authorization = `Bearer ${id_token}`;
        this.props.getAllBookItem(Authorization);
        }
        else{
            alert("bạn cần phải thực hiện cập nhật thông tin tài khoản để thực hiện chức năng này");
            this.props.history.push("/profile");
        }
        }
        else{
            alert("bạn cần đăng nhập để truy cập trang này")
            this.props.history.push("/login");
        }
       
    }


    render() { 
        return ( 
            <Fragment>
                <div className="container">
                    <div className="row">
                        
                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                        <button type="button" className="btn btn-primary">Registed</button>
                    
                         
                        </div>
                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
 
                        <button type="button" className="btn btn-primary">Recever</button>

                            </div>
                    </div>

                        <Registed history = {this.props.history}/>
    
                </div>
                
            </Fragment>
           
         );
    }
}

const mapStateToProps = state => {
    return {
        user : state.user
    }
}
const mapDispatchToProps = (dispatch,props) =>{
    return {
        getBookItemByUser : (id) =>{
            dispatch(actions.getBookItemByUserRequest(id))
        },
        getAllBookItem : (Authorization) =>{
            dispatch(actions.getAllBookItemRequest(Authorization))
        }
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Cart);