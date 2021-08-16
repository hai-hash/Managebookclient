import React, { Component } from 'react';
import Search from './Search';
import Filter from './Filter';
class Books extends Component {
    state = {  }
    filter = (data) =>{
        var {filter} = this.props;
        filter(data);

    }
    render() { 
       
        return ( 
            <section className="section">
            <h1 className="section-heading">List Books In Library</h1>
            
            <div className="row">
                <Search placeholder="Tên Sách" by="subject"/>
              
            </div>
            <br/>
            <br/>
            <div className="row">
            <Filter filter = {this.filter}/>

            </div>

            <br/>
            <br/>
            <br/>
            
            <div className="row">
                {this.props.children}
            </div>
            </section>
         );
    }
}
 
export default Books;