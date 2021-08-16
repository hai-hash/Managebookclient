
import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import * as routes from './Route';
class Body extends Component {
    state = {  }
    render() { 
        return ( 
            <main id="mainContainer">
            
            <Switch>
                {this.displayMainContent(routes.routes)}
            </Switch>
            
        </main>
         );
    }

    displayMainContent = (contents) =>{
        var result = null;
        if(contents.length > 0){
            result = contents.map((content,index) => {
                return   <Route key={index} path={content.path} exact={content.exact} component={content.content}/>
            });
        }

        return result;
    }
}
 
export default Body;