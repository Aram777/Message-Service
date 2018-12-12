import React, { Component } from 'react';
import axios from 'axios';

class UpdateBook extends Component {
  constructor(props) {
    super(props);
    this.routeParam = props.match.params.id;
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.getSelected = this.getSelected.bind(this);
      this.state = {
      book_id: this.props.match.params.id,
      book_name: '',
      author: '',
      isbn: ''
    };
    this.getSelected(this.props.match.params.id);
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };
  getSelected(book_id) {
    axios.get(`http://localhost:3000/books/`+book_id).then(res => {
      const state = {
        book_name: res.data[0].book_name,
        author: res.data[0].author,
        isbn: res.data[0].isbn
      };
      this.setState(state);
    });
    }

  getBooks(val) {
    this.setState({ book_id: val.target.value });
    axios.get('http://localhost:3000/books/' + val.target.value).then(res => {
      const state = {
        book_name: res.data[0].book_name,
        author: res.data[0].author,
        isbn: res.data[0].isbn
      };
      this.setState(state);
      console.log(res.data[0].book_name);
    });
  }

  updateInputValue(val) {
    this.setState({ book_id: val.target.value });
  }
  handleSubmit = event => {
    event.preventDefault();
    const id = this.state.book_id;
    const { book_name, author, isbn } = this.state;

    axios
      .put('http://localhost:3000/books/' + id, {
        book_name,
        author,
        isbn
      })
      .then(res => {
        this.props.history.push('/booklist');
      });
  };

  render() {
    return (
      <div className="container">
        <h2>Update Book</h2>
        <table>
          <tbody>
            <tr>
              <td width="80px">
                <label> Book ID:</label>
              </td>
              <td>
                <input
                  type="number"
                  name="book_id"
                  onChange={this.getBooks}
                  value={this.state.book_id}
                  min="1"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <form onSubmit={this.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td width="80px">
                  <label>Name</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="book_name"
                    value={this.state.book_name}
                    onChange={this.onChange}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label>Author</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="author"
                    onChange={this.onChange}
                    value={this.state.author}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>ISBN</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="isbn"
                    onChange={this.onChange}
                    value={this.state.isbn}
                  />
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <button className="btn btn-primary" type="submit">
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default UpdateBook;
