import { Paper,IconButton,InputBase } from '@material-ui/core';
import React, { Component } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import './style.css';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';

class Search extends Component {
    state = { 
        placeholder : "",
        by : "",
        value : "",
     }
     componentDidMount(){
         var {placeholder,by} = this.props;
         this.setState({
             placeholder,
             by,
         })
     }

     onChange = (e) =>{
         var value = e.target.value;
         this.setState({
            value : value
         })

     }
     onSearch = (e) =>{
         e.preventDefault();
         var {value,by} = this.state;
         var content_search = `${by}.contains=${value}`;
         var token = JSON.parse(localStorage.getItem("id_token"));
         if(token !== null){
            var {id_token} = token
            var Authorization = `Bearer ${id_token}`;
            this.props.search(Authorization,content_search);
         }
         else{
            alert("you need login to access ");
         }

     }
     
    render() { 
        var {placeholder,by} = this.state;
        return ( 
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 content-search">
                <Paper component="form" className="root">
                    <IconButton aria-label="menu">
                    <MenuIcon />
                    </IconButton>
                    <InputBase onChange={this.onChange} name={by} placeholder={placeholder} className="input"/>
                    <IconButton onClick={this.onSearch}  aria-label="search" className="iconButton">
                    <SearchIcon />
                    </IconButton>
                </Paper>          
            </div>

            
         );
    }
}

const mapStateToProps = state =>{
    return {


    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return {
        search : (id_token,content_search) =>{
            dispatch(actions.SearchRequest(id_token,content_search))
        }
    }
}

 
export default connect(mapStateToProps,mapDispatchToProps)(Search);