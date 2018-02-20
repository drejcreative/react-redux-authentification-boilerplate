import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../config';

// Redux Files
import { connect } from 'react-redux';
import * as authActions from '../store/actions/authActions';

//Components
import './App.css';
import AuthForm from './../components/AuthForm/AuthForm';
import Main from './Main/Main';

// Project Setup Files
import appImage from './../assets/img/background.jpg';

class App extends Component {
  state = {
    login: 'login'
  }

  componentWillMount() {
    this.checkTokken();
  };

  wrongTokken = () => {
    this.props.onSetToken({
      token: '',
      userId: '',
      ttl: null
    });
    // Auth Set
    this.props.onIsAuthenticated(false);
  }

  checkTokken = () => {
    // Check for token
    const token = localStorage.getItem('token');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    if(token) {
      if(expirationDate > new Date()) {
        this.props.onSetToken({
          token: localStorage.getItem('token'),
          userId: localStorage.getItem('user'),
          ttl: localStorage.getItem('expirationDate'),
        });
        // Auth Set
        this.props.onIsAuthenticated(true);
      } else {
        this.wrongTokken();
      }
    } else {
      this.wrongTokken();
    }
  }

  // Get username and password from props
  getUser = () => {
    let user = {};
    user = {
      username: this.props.username,
      password: this.props.password,
      ttl: 86400,// 24 Hours tokken life
    }
    return user;
  }

  // User Login
  login = (e, getUser) => {
    axios.post(`${config.url}/Users/login`, getUser)
    .then(res => {
      this.props.onLogin({
        userId: res.data.userId,
        token: res.data.id,
        ttl: res.data.ttl,
      });
      // Auth Set
      this.props.onIsAuthenticated(true);
      // Setting username and token to local storage
      const expirationDate = new Date(new Date().getTime() + res.data.ttl * 1000);
      localStorage.setItem('token', res.data.id);
      localStorage.setItem('user', res.data.userId);
      localStorage.setItem('expirationDate', expirationDate);
    })
    .catch(err => {
      this.props.onSetError(err.response.data.error.message);
      // Auth Set
      this.props.onIsAuthenticated(false);
    })
    e.preventDefault();
  }

  register = (e, getUser) => {
    const user = {
      username: this.props.username,
      email: this.props.email,
      password: this.props.password
    }
    const regUser = getUser;
    axios.post(`${config.url}/Users`, user)
    .then(res => {
      this.login(e, regUser);
    })
    e.preventDefault();
  }

  handleChange = e => {
    // this.setState({
    //   [e.target.name]: e.target.value
    // });
    this.props.onUserInputTyping(
       e.target
    );
  }

  logout = () => {
    const token = this.props.token;

    axios.post(`${config.url}/Users/logout?access_token=${token}`)
    .then(res => {
      // Auth Set
      this.props.onIsAuthenticated(false);
      // Empty input fields
      this.props.onEmptyLoginField();
      // Remove username and Token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('expirationDate');
      this.props.onSetToken({
        token: '',
        userId: '',
      });
    }).catch(err => console.log(err.response.data.error.message));
  }

  loginClick = () => {
    this.setState({
      login: 'login',
    })
    this.props.onResetError();
  }

  registerClick = () => {
    this.setState({
      login: 'register',
    })
    this.props.onResetError();
  }

  inSecure = () => {
    const {username, password, email} = this.props;
    return (
      <div className="App-intro"
        style={{backgroundImage: `url(${appImage})`}}
      >
        <h1>{this.props.login}</h1>
        <AuthForm
          login={(e) => this.login(e, this.getUser())}
          register={(e) => this.register(e, this.getUser())}
          username={username}
          password={password}
          email={email}
          handleChange={this.handleChange}
          appName={config.appName}
          appTagline={config.appTagline}
          loginClick={this.loginClick}
          registerClick={this.registerClick}
          what={this.state.login}
          error={this.props.error}
        />
      </div>
    )
  }

  secure = () => {
    return (
      <Main
        logout={this.logout}
      />
    )
  }

  render() {
    return (
      <div className="App">

        {
          this.props.authentificated && this.props.token ?
          this.secure():
          this.inSecure()
        }

      </div>
    );
  }
}

const mapStateToprops = state => {
  return {
    st: state.auth,
    username: state.auth.loginFields.username,
    password: state.auth.loginFields.password,
    email: state.auth.loginFields.email,
    error: state.auth.loginFields.error,
    userId: state.auth.userData.userId,
    token: state.auth.userData.token,
    authentificated: state.auth.authentificated,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onEmptyLoginField: () => dispatch(authActions.emptyLogin()),
    onSetError: err => dispatch(authActions.setError(err)),
    onResetError: () => dispatch(authActions.resetError()),
    onLogin: user => dispatch(authActions.userLogin(user)),
    onSetToken: token => dispatch(authActions.setToken(token)),
    onUserInputTyping: input => dispatch(authActions.userInputTyping(input)),
    onIsAuthenticated: auth => dispatch(authActions.isAuthenticated(auth)),
  }
}

export default connect(mapStateToprops, mapDispatchToProps)(App);
