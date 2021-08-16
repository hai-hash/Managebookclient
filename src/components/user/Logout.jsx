import React, { Component } from 'react';
import * as actions from './../../actions/index';
import { connect } from 'react-redux'

class Logout extends Component {
    state = {  }
    
    Logout = () =>{
        this.props.logout();
        var token = JSON.parse(localStorage.getItem("id_token"));
        if(token === null){
            alert("Logout succsess");
            this.props.history.push("/");
        }
      
    }
    render() { 
        return ( 
            <div>
                <h1>
                    {this.Logout()}
                </h1>
            </div>
         );
    }
}

const mapStateToProps = state =>{
    return {
        user : state.user,
    }
}
const mapDispatchToProps = (dispatch, props) =>{
    return {
        logout : () =>{
            dispatch(actions.logout())
        }
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Logout);