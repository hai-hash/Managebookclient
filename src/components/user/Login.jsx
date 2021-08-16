import React, { Component } from 'react';
import './../../css/App.css';
import './../../css/main.css';
import './../../css/util.css';
import { connect } from 'react-redux'
import * as actions from './../../actions/index';

class Login extends Component {
    state = { 
		username : "",
		password : "",
	 }
	 onChange = (e) =>{
		 var name = e.target.name;
		 var value = e.target.value;

		 this.setState(
			{
				[name] : value
			}
		 );
	 }
	 onSubmit = (e) =>{
		 var {username,password} = this.state;
		 e.preventDefault();
		 this.props.login(username,password);
		 var token = JSON.parse(localStorage.getItem("id_token"));
		 if(token !== null){
			 console.log("đã vào đến 1")
			var id_token = `Bearer ${token.id_token}`
			this.props.getReaderCurren(id_token)
			this.props.history.goBack();

		 }
	 }
    render() { 
        return ( 
            <div>
               <div className="limiter">
		<div className="container-login100 image" >
			<div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
				<form onSubmit={this.onSubmit} className="login100-form validate-form">
					<span className="login100-form-title p-b-49">
						Login
					</span>

					<div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span className="label-input100">Username</span>
						<input onChange={this.onChange} className="input100" type="text" name="username" placeholder="Type your username"/>
						<span className="focus-input100" data-symbol="&#xf206;"></span>
					</div>

					<div className="wrap-input100 validate-input" data-validate="Password is required">
						<span className="label-input100">Password</span>
						<input className="input100" onChange={this.onChange} type="password" name="password" placeholder="Type your password"/>
						<span className="focus-input100" data-symbol="&#xf190;"></span>
					</div>
					
					<div className="text-right p-t-8 p-b-31">
						<a href="https://www.facebook.com/profile.php?id=100005400360929">
							Forgot password?
						</a>
					</div>
					
					<div className="container-login100-form-btn">
						<div className="wrap-login100-form-btn">
							<div className="login100-form-bgbtn"></div>
							<button className="login100-form-btn">
								Login
							</button>
						</div>
					</div>

					<div className="txt1 text-center p-t-54 p-b-20">
						<span>
							Or Sign Up Using
						</span>
					</div>

					<div className="flex-c-m">
						<a href="https://www.facebook.com/profile.php?id=100005400360929" className="login100-social-item bg1">
							<i className="fa fa-facebook"></i>
						</a>

						<a href="https://www.facebook.com/profile.php?id=100005400360929" className="login100-social-item bg2">
							<i className="fa fa-twitter"></i>
						</a>

						<a href="https://www.facebook.com/profile.php?id=100005400360929" className="login100-social-item bg3">
							<i className="fa fa-google"></i>
						</a>
					</div>

					<div className="flex-col-c p-t-155">
						<span className="txt1 p-b-17">
							Or Sign Up Using
						</span>

						<a href="https://www.facebook.com/profile.php?id=100005400360929" className="txt2">
							Sign Up
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
	

	<div id="dropDownSelect1"></div>
            </div>
         );
    }
}

const mapStateToProps = state =>{
	return {
		user : state.user,
	}
}

const mapDispatchToProps = (dispatch,props) =>{
	return {
		login : (username,password) =>{
			dispatch(actions.login(username,password))
		},
		getuser : () =>{
			dispatch(actions.getuser())
		},
		getReaderCurren : (id_token) =>{
			dispatch(actions.GetReaderCurrenRequest(id_token))
		}

	}
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Login);