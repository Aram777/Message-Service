import React, { Component } from 'react';
import './App.css';
import Home from './Home';

import Customers from './Customers';
import Messages from './Messages';

import { NavLink, Route } from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <div>
        <div className="menu">
          <ul>
            <li>
              <NavLink to="/home" exact>Home</NavLink>
            </li>
            <li>
              <NavLink to="/lstCustomers" exact>Customers</NavLink>
            </li>
            <li>
              <NavLink to="/lstMessages">Messages</NavLink>
            </li>
          </ul>
        </div>
        
        <div className="myPage">
          <Route path="/home" exact component={Home} />
          <Route path="/lstCustomers" exact component={Customers} />
          <Route path="/lstMessages" exact component={Messages} />
          <Customers/>
        </div>
      </div>
    );
  }
}

export default App;
