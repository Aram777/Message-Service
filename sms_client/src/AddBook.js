import React, { Component } from 'react';
import axios from 'axios';

class AddBook extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      book_id: '',
      book_name: '',
      author: '',
      isbn: ''
    };
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  handleSubmit = event => {
    event.preventDefault();

    const { book_id, book_name, author, isbn } = this.state;

    axios
      .post('http://localhost:3000/books', { book_id, book_name, author, isbn })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.props.history.push('/showbooks');
      });
  };

  render() {
    return (
      <div className="container">
        <h2>Add Book</h2>
        <form onSubmit={this.handleSubmit}>
        <table>
          <thead></thead>
          <tbody>
            <tr><th>book_id:</th><td><input type="number" name="book_id" onChange={this.onChange} /></td></tr>
            <tr><th>Name:</th><td><input type="text" name="book_name" onChange={this.onChange} /></td></tr>
            <tr><th>Author:</th><td><input type="text" name="author" onChange={this.onChange} /></td></tr>
            <tr><th>ISBN:</th><td><input type="text" name="isbn" onChange={this.onChange} /></td></tr>
            <tr><th></th><td> <button className="btn btn-primary" type="submit">Add</button></td></tr>
          </tbody>
        </table>
        </form>
      </div>
    );
  }
}

export default AddBook;
