import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container, TextField,Grid} from '@material-ui/core';
import NearMeIcon from '@material-ui/icons/NearMe';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { connect } from 'react-redux'
import * as actions from './../../actions/index'
import * as api from './../../Utils/callapi';



class Profile extends Component {
    state = { 
    reader : {
            id : null,
            phone : "",
            streetAddress : "",
            city : "",
            state: "",
            zipCode: "",
            country: "",
            status: "ACTIVE",
            modifiedDate: "2021-07-18",
            user: {},
        }
     }
     
     componentDidMount(){
        var reader = localStorage.getItem("reader");
        if(reader){
            if(reader !== "khongco"){
            this.setState({
                reader :JSON.parse(reader)
            })  
        }
        this.getUser();
        }
        else{
            alert("thông tin profile hiên tại không tồn tại, mời bạn đăng nhập lại để lấy thông tin")
            this.props.history.push("/login");
        }
     }
     onChange = (e) =>{
        var  name = e.target.name;
        var value = e.target.value;
        this.setState({
            reader :{...this.state.reader,
                [name] : value
            }
           
        })
     }
     ChuyenDoi =(n) =>{
        if(n < 9) return `0${n}`;
        else return n;
     }
     getUser = () =>{
        var token = JSON.parse(localStorage.getItem("id_token"));
        if(token !== null){
        var {id_token} = token
        var Authorization = `Bearer ${id_token}`;
       api.CallApi("account","get",null,Authorization)
       .then(res =>{
           console.log(res.data)

        this.setState({
            reader : {...this.state.reader,
                user : res.data}
           
        });
        localStorage.setItem("user",JSON.stringify(res.data));

       })
        }
        else{
            this.props.history.push("/login");
        }
     }

     updateProfile = () => {

        const d = new Date();
        var date = `${d.getFullYear()}-${this.ChuyenDoi(d.getMonth() + 1)}-${this.ChuyenDoi(d.getDay() + 1)}`;
        var token = JSON.parse(localStorage.getItem("id_token"));
        if(token !== null){
         var {id_token} = token
        var Authorization = `Bearer ${id_token}`;
        var data = this.state.reader
        data.modifiedDate = date;
        this.props.updateReaderCurren(data.id,data,Authorization);
        }
        else{
            alert("disconnect, please login again !");
            this.props.history.push("/login");
        }
        
        
     }

     addNewProfile = () =>{

        var token = JSON.parse(localStorage.getItem("id_token"));
        if(token !== null){
        var {id_token} = token
        var Authorization = `Bearer ${id_token}`;
        var data =  this.state.reader;
        this.props.addNewCurren(data,Authorization);
        }
    else{
        alert("disconnect, please login again !");
        this.props.history.push("/login");
    }
        
     }

     onSubmit = (e) =>{
         e.preventDefault();
         if(this.state.reader.id === null){
            this.addNewProfile();
         }
         else{
             this.updateProfile();
         }
       
     }
    render() { 

        var {reader} = this.state;

        console.log(reader)
       
      
        
        return ( 
            <div>
                <Container>
                    <br/>
                    <br/>
                    <Grid container spacing={3}>
                        
                       
                        
                        
                    </Grid>
                    
                    <Grid container spacing={7}>
                        
                        <Grid item xs={12} sm={6}>

                        <Grid item xs={6} sm={6}>
                                <LocationOnIcon></LocationOnIcon>
                                Country : {reader.country}
                        </Grid>

                        <Grid item xs={6} sm={6}>
                        <NearMeIcon></NearMeIcon>
                            State : {reader.state}
                        </Grid>

                        <Grid item xs={6} sm={6}>
                        <LocationCityIcon></LocationCityIcon>
                            City : {reader.city}
                        </Grid>

                        <Grid item xs={6} sm={6}>
                        <LocalPhoneIcon></LocalPhoneIcon>
                           Number Phone: {reader.phone}
                        </Grid>
                            
                            <form onSubmit= {this.onSubmit}>
                                <div className="form-group">
                                    
                                    <TextField onChange={this.onChange}  name="country" label="Country" fullWidth/>
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group">
                                    
                                    <TextField onChange={this.onChange}    name="state" label="State" fullWidth/>
                                </div>
                                <br/>
                                <br/>

                               
                                <div className="form-group">
                                    
                                    <TextField  onChange={this.onChange}   name="city" label="City" fullWidth/>
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group">
                                  
                                    <TextField onChange={this.onChange}    name="streetAddress" label="Stress" fullWidth/>
                                </div>
                                <br/>
                                <br/>

                                <div className="row">
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group">
                                    <TextField onChange={this.onChange}    name="phone" label="Number Phone" fullWidth/>
                                    </div>
                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group">
                                    <TextField onChange={this.onChange}    name="zipCode" label="Zip Code" fullWidth/>
                                    </div>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            
                                <Button type="submit" className="btn btn-primary">Save</Button>
                            </form>
                            
                            
                        </Grid>
                        <Grid item xs={12} sm={6}>

                           <img src="https://anhdepblog.com/wp-content/uploads/2020/09/anh-dep-lam-hinh-nen-2.jpg" alt="anh nen"/>
                         
                            
                            
                        </Grid>
                        
                    </Grid>
                    
                </Container>
                
            </div>
         );
    }
}

const mapStateToProps = state =>{
    return {
        user: state.user,
        reader : state.reader
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return {
        getUser : () =>{
            dispatch(actions.getuser())
        },
        addNewCurren : (data,id_token) =>{
            dispatch(actions.AddNewCurrenRequest(data,id_token))
        },
        updateReaderCurren : (id,reader,id_token) =>{
            dispatch(actions.UpdateReaderCurrenRequest(id,reader,id_token))
        }
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Profile);