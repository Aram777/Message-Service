import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class DeleteSelected extends Component {
    constructor(props) {
        super(props);
        this.routeParam = props.match.params.id;
        this.delete = this.delete.bind(this);
        this.state = {
            book_id: this.props.match.params.id
          };
        
    }

      delete = event => {
        event.preventDefault();
        const id = this.state.book_id;
        axios
          .delete('http://localhost:3000/books/' + id)
    
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.props.history.push('/booklist');
          });
      };
    render() {
        return (
            <div className="container">
                <p>Do you really want to delete this book?</p>
                <button className="btn btn-danger" onClick={this.delete}>Delete</button>
                <NavLink to={`/selectedbook/${this.state.book_id}`}><button className="btn btn-primary">Cancel</button></NavLink>
            </div>
        );
    }
}

export default DeleteSelected;