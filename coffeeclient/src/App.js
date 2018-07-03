import React, { Component } from 'react';
import './App.css';
import SiteBar from './home/Navbar';
import Home from './home/Home';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Coffee from './coffee/Coffee';
import Vendor from './vendor/Vendor';
import MyAccount from './coffee/MyAccount';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: '',
      isUser: true,
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      id: ''
    }
  }
  userName = (valueFromChildComponent) => {
    this.setState({firstName: valueFromChildComponent})
  }
  changeUserStatus = () => {
    this.setState({isUser: !this.state.isUser})
  }
  
  checkUser = () => {
    if(this.state.isUser) {
      return (
        <Login setToken={this.setSessionState} changeUserStatus={this.changeUserStatus} nameFromApp={this.setFirstName} usernameFromApp={this.setUsername} lastNameFromApp={this.setLastName} emailFromApp={this.setEmail}/>
      )
    }
    else {
      return (
        <Signup setToken={this.setSessionState} changeUserStatus={this.changeUserStatus} nameFromApp={this.setFirstName} usernameFromApp={this.setUsername} lastNameFromApp={this.setLastName} emailFromApp={this.setEmail}/>
      )  
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token && !this.state.sessionToken) { 
      this.setState({ sessionToken: token });
    }
    const fName = localStorage.getItem('fName');
    this.setState({ firstName: fName});

    const username = localStorage.getItem('username');
    this.setState({username: username});

    const lName = localStorage.getItem('lName');
    this.setState({lastName: lName});

    const email = localStorage.getItem('email');
    this.setState({email: email});
  }
  setFirstName = (fName) => {
    localStorage.setItem('fName', fName);
    this.setState({firstName: fName});
  }
  setUsername = (username) => {
    localStorage.setItem('username', username);
    this.setState({username: username});
  }
  setLastName = (lName) => {
    localStorage.setItem('lName', lName);
    this.setState({lastName: lName});
  }
  setEmail = (email) => {
    localStorage.setItem('email', email);
    this.setState({email: email});
  }

  setSessionState = (token) => {
    localStorage.setItem('token', token);
    this.setState({ sessionToken: token });
  }

  logout = () => {
    this.setState({ 
      sessionToken: '',
      firstName: '',
      lastName: '',
      username: '',
      email: ''
    });
    localStorage.clear();
  }
  protectedViews = () => {
  if (this.state.sessionToken === localStorage.getItem('token')) {
    return (
      
      <Switch>
        <Route path='/' exact>
          <Home sessionToken={this.state.sessionToken} firstName={this.state.firstName}/>
        </Route>
        <Route path='/coffee' exact>
          <Coffee sessionToken={this.state.sessionToken} username={this.state.username}/>
        </Route>
        <Route path='/vendor' exact>
          <Vendor sessionToken={this.state.sessionToken} username={this.state.username} />
        </Route>
        <Route path='/myaccount' exact>
          <MyAccount sessionToken={this.state.sessionToken} firstName={this.state.firstName} lastName={this.state.lastName} email={this.state.email} username={this.state.username} />
        </Route>
      </Switch>
    )
  } else {
    return (
      <Route path="/auth" >
        {this.checkUser()}
      </Route>
    )
    }
  }

  render() {
    return (
      <Router>
        <div>
        <SiteBar clickLogout={this.logout} username={this.state.username}/>
        {this.protectedViews()}
        <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
