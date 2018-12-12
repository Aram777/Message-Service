import React, { Component } from 'react';
import axios from 'axios';
import { NavLink} from 'react-router-dom';

class SelectedBook extends Component {
    constructor(props) {
        super(props);
        this.routeParam = props.match.params.id;
        this.getBook = this.getBook.bind(this);
        this.state = {
        books: []
        };
        this.getBook(this.props.match.params.id);
    }

    getBook(book_id) {
        axios.get(`http://localhost:3000/books/`+book_id).then(res => {
        const books = res.data;
        this.setState({ books });
        });
        }
      
      render() {
        return (
          <div className="container">
            <h2>Selected Book</h2>
            <table className="table">
              <thead>
                
              </thead>
              <tbody>
                {this.state.books.map(book => (
                <tr key={book.book_id}>
                <tr><th>ID</th><td>{book.book_id}</td></tr>
                <tr><th>Book name</th><td>{book.book_name}</td></tr>
                <tr><th>Author</th><td>{book.author}</td> </tr>    
                <tr><th>ISBN</th><td>{book.isbn}</td> </tr>                     
                </tr>         
                ))}
  
              </tbody>
            </table>
            <NavLink to={`/updatebook/${this.props.match.params.id}`}><button className="btn btn-primary">Update</button></NavLink>
            <NavLink to={`/deleteselected/${this.props.match.params.id}`}><button className="btn btn-danger">Delete</button></NavLink>
          </div>
        );
      }
    }
export default SelectedBook;

