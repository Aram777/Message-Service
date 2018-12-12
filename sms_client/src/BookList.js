import React, { Component } from 'react';
import axios from 'axios';
import ReactDataGrid from "react-data-grid";
const COLUMN_WIDTH = 140;
const columns = [
  {
    key: "idcustomers",
    name: "idcustomers",
    frozen: true,
    width: COLUMN_WIDTH
  },

  {
    key: "first_name",
    name: "First Name",
    frozen: true,
    width: COLUMN_WIDTH
  },
  {
    key: "last_name",
    name: "Last Name",
    frozen: true,
    width: COLUMN_WIDTH
  },
  {
    key: "email",
    name: "Email",
    width: COLUMN_WIDTH
  }


];

class BookList extends Component {
  constructor() {
    super();
    
    this.getBooks = this.getBooks.bind(this);
    this.state = {
      books: [], rowselected:[]
    };
    this.getBooks();
    
    

  }
  getBooks() {
    axios.get(`http://localhost:3000/customers`).then(res => {
      const books = res.data;
      this.setState({ books });
    });
  }

  render() {
    return (
      <ReactDataGrid
        columns={columns}
        rowGetter={i => this.state.books[i]}
        rowsCount={this.state.books.length}
        
      />
    );
  }
}

export default BookList;
