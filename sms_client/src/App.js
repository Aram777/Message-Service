import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import BookTable from './BookTable';
import AddBook from './AddBook';
import UpdateBook from './UpdateBook';
import DeleteBook from './DeleteBook';
import Customers from './Customers';
import SelectedBook from './SelectedBook';
import { NavLink, Route } from 'react-router-dom';
import DeleteSelected from './DeleteSelected';

class App extends Component {
  // render() {
  //   return (
   
  //     <BookList />
   
  // );
  // }
  render() {

    return (
      <div>
        <div className="menu">
          <ul>
            <li>
              <NavLink to="/home" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/lstCustomers">Customers</NavLink>
            </li>
        
            <li>
              <NavLink to="/showbooks">All Books</NavLink>
            </li>
            <li>
              <NavLink to="/addbook">AddBook</NavLink>
            </li>
            <li>
              <NavLink to="/updatebook/1">UpdateBook</NavLink>
            </li>
            <li>
              <NavLink to="/deletebook">DeleteBook</NavLink>
            </li>
          </ul>
        </div>
        <div className="container">
        {/* <h1>Library example</h1> */}
        <Home/>
        </div>
        <div className="myPage">
          <Route path="/home" exact component={Home} />
          <Route path="/addbook" exact component={AddBook} />
          <Route path="/showbooks" exact component={BookTable} />
          <Route path="/updatebook/:id" exact component={UpdateBook} />
          <Route path="/deletebook" exact component={DeleteBook} />
          <Route path="/lstCustomers" exact component={Customers} />
          <Route path="/selectedbook/:id" exact component={SelectedBook} />
          <Route path="/deleteselected/:id" exact component={DeleteSelected} />
        </div>
      </div>
    );
  }
}

export default App;
