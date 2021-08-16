import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './../../css/book.css';
class Book extends Component {
    state = {  }
    render() { 
        var  {book} = this.props;
        var url = this.props.match.url;
        return ( 
           

            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 mb-r ">
            <div className="card text-center card-cascade narrower" style={{height : '500px',width : '300px'}}>
                <div className="view overlay hm-white-slight z-depth-1" >
                     <img src={book.imageUrl}className="img-fluid" alt="imagebook" /> 
                   
                    <div>
                        <div className="mask waves-light waves-effect waves-light"></div>
                    </div>
                   
                </div>
                <div className="card-body">
                    <h4 className="card-title">
                        <strong>
                            <Link to = {`${url}/${book.id}`}>{book.subject}</Link>
                        </strong>
                    </h4>
                    <p className="card-text">
                        {book.target}
                    </p>
                    <div className="card-footer">
                        <span className="left">{book.numberOfPages}.page</span>
                        
                    </div>
                </div>
            </div>
        </div>

         );
    }
}
 
export default Book;