import React, { Component } from 'react';
import Menu from './Menu'
import {Link} from 'react-router-dom';
import * as links from './Link';
class Header extends Component {
    state = {  }
    render() { 
        return ( 
            <div>

            <div className="navbar fixed-top navbar-toggleable-md navbar-expand-lg navbar-dark scrolling-navbar double-nav" style={{background : "linear-gradient(45deg, #00dbde, #fc00ff, #00dbde, #fc00ff)"}}>

                <div className="float-left">
                    <a href="https://www.facebook.com/profile.php?id=100005400360929" data-activates="slide-out" className="button-collapse">
                        <i className="fa fa-bars"></i>
                    </a>
                </div>

                <div className="breadcrumb-dn mr-auto">
                    <ol className="breadcrumb header-breadcrumb">
                        {this.DisplayMenuLink(links.linkmenu)}
                    </ol>
                </div>

                <ul className="nav navbar-nav nav-flex-icons ml-auto">
                    <li className="nav-item dropdown">
                        <Menu/>
                    </li>
                    
                    
                </ul>

            </div>

            </div>
            
         );
    }

    DisplayMenuLink = (links) =>{
        var result = null;
        if(links.length > 0 ){
            result = links.map((link,index) =>{
                return (
                <li key={index} className="breadcrumb-item">
                    <Link  to = {link.to} exact = {link.exact.toString()}>{link.lable}</Link>
                </li>
                );
                
            });
        }

        return result;

    }



}
 
export default Header;