import React, { Component } from 'react';
import axios from 'axios';

class DeleteBook extends Component {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.state = {
      book_id: 1
    };
  }

  updateInputValue(val) {
    this.setState({ book_id: val.target.value });
  }
  delete = event => {
    event.preventDefault();
    const id = this.state.book_id;

    axios
      .delete('http://localhost:3000/books/' + id)

      .then(res => {
        console.log(res);
        console.log(res.data);
        this.props.history.push('/showbooks');
      });
  };

  render() {
    return (
      <div className="container">
        <h2>Delete Book</h2>
        <label>book_id:</label>
        <input type="number" onChange={this.updateInputValue} min="1" />

        <button className="button" onClick={this.delete}>
          Delete
        </button>
      </div>
    );
  }
}

export default DeleteBook;
