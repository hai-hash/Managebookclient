import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as links from './Link';
import './../../css/App.css';
class Menu extends Component {
    state = { 
     }
    render() { 
        return ( 
            <div>

                <input type="checkbox" id="active"/>
                <label  htmlFor="active" className="menu-btn"><span></span></label>
                <label htmlFor="active"  className="close"></label>
                <div className="wrapper">
                    <ul>
                    {this.DisplayMenuLink(links.linkmenuright)}
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
                <li key={index}>
                    <Link  to = {link.to}>{link.lable}</Link>
                </li>
                );
                
            });
        }

        return result;

    }
}
 
export default Menu;