import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'

class Filter extends Component {
    state = { 
        value : "",
     }
    displayCategory = (categorys) =>{
        var result = null;
        if(categorys.length > 0){
            result = categorys.map((category,index) =>{
                return  <MenuItem key={index}  value={category.id}>{category.name}</MenuItem>
            })
        }
    
        return result;
    }
    onChange = (e) =>{
        this.setState({
            value : e.target.value
        })

        this.props.filter(e.target.value);
        

    }
    render() { 
        var {categorys} = this.props;
        var {value} = this.state;
        return ( 
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 content-search">
                <Paper className="content1">
               <FormControl className="formControl">
               <InputLabel id="demo-mutiple-name-label">Category</InputLabel>
               <Select
                id="demo-mutiple-name"
                className="MenuProps"
               value ={value}
                onChange = {this.onChange}
                >
                 <MenuItem value={null}>All</MenuItem>

                {this.displayCategory(categorys)}
                   


                </Select>

               </FormControl>

               </Paper>
                   
                
            </div>
         );
    }
}

const mapStateToProps = state =>{
    return {
        categorys : state.categorys
    }
}
 
export default connect(mapStateToProps,null)(Filter);