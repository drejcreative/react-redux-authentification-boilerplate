import React, {Component} from 'react';

// Redux Files
import {connect} from 'react-redux';
import * as mainAppActions from '../../store/actions/mainAppActions';

import axios from 'axios';
import {config} from '../../config';

import Header from '../../components/Header/Header';

import './Main.css';

class Main extends Component {

  state = {
    error: ''
  }

  componentWillMount() {
    this.getUserData();
  }

  getUserData = () => {
    axios.get(`${config.url}/Users/${this.props.authUserId}?access_token=${this.props.authToken}`)
      .then(res => {
        const user = {
          email: res.data.email,
          id: res.data.id,
          username: res.data.username,
        };
        this.props.onGetUserData(user);
      })
      .catch(err => {
        this.setState({
          error: err.response.data.error.message
        })
      });
  }

  render() {
    const { error } = this.state;
    return (
      <div className="app">
        <Header user={this.props.username} logout={this.props.logout}/>
        {error && <span>{error}</span>}
      </div>
    );
  };
}

const mapStateToprops = state => {
  return {
    authUserId: state.auth.userData.userId,
    authToken: state.auth.userData.token,

    username: state.main.userData.username,
    email: state.main.userData.email,
    id: state.main.userData.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetUserData: data => dispatch(mainAppActions.getUSerData(data)),
  }
}

export default connect(mapStateToprops, mapDispatchToProps)(Main);
