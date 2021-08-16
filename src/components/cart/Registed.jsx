import React, { Component, Fragment } from 'react';
import ItemRegisted from './ItemRegisted';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
class Registed extends Component {
    state = {  }
    componentDidMount(){
        var token = JSON.parse(localStorage.getItem("id_token"));
        if(token !== null){
        var {id_token} = token
        // var {reader} = this.props;
        var reader = JSON.parse(localStorage.getItem("reader"));
        if(reader !== null){
        var Authorization = `Bearer ${id_token}`;
        this.props.getBookReseOfUserCurren(reader.id,Authorization);
        }
        else{
            alert("vừa lãi bạn đã đăng nhập thất bại , bạn vui lòng đăng nhập lại")
            this.props.history.push("/login")
        }
    }
    }
    Display_BookRese = (bookreses) =>{
        var result = null;
        if(bookreses.length > 0){
            result = bookreses.map((bookrese,index) =>{
                return  <ItemRegisted key={index} bookrese={bookrese}/>
            });
        }

        return result;

    }
    render() { 
        return ( 
            <Fragment>
                <div className="row">
                {this.Display_BookRese(this.props.bookreses)}
                </div>
            </Fragment>
         );
    }
}

const mapStateToProps = state =>{
    return {
        bookreses : state.bookreses,
        reader : state.reader,
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return {
        getBookReseOfUserCurren : (id,Authorization) =>{
            dispatch(actions.getBookReseOfUserCurrenRequest(id,Authorization))
        },
        getBookItemById : (id) =>{
            dispatch(actions.getBookItemByIdRequest(id))
        }
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Registed);