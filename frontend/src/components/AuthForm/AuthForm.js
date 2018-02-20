import React from 'react';

import './AuthForm.css';

const AuthForm = (props) => {
  let renderForm;

  const login = () => {
    return (
      <div>
        <form onSubmit={props.login}>
          <input type="text"
            className="input"
            placeholder="Username"
            name="username"
            value={props.username}
            onChange={props.handleChange}
          />
          <input type="password"
            className="input"
            name="password"
            placeholder="password"
            value={props.password}
            onChange={props.handleChange}
          />
          <button className="button primary full">Submit</button>
          <footer>
            {
              props.what === 'login' ?
                <span onClick={props.registerClick}>register</span> :
                <span onClick={props.loginClick}>Login</span>
            }
          </footer>
        </form>
      </div>
    );
  };

  const register = () => {
    return (
      <div>
        <form onSubmit={props.register}>
          <input type="text"
            className="input"
            placeholder="Username"
            name="username"
            value={props.username}
            onChange={props.handleChange}
          />
          <input type="email"
            className="input"
            placeholder="Email"
            name="email"
            value={props.email}
            onChange={props.handleChange}
          />
          <input type="password"
            className="input"
            name="password"
            placeholder="password"
            value={props.password}
            onChange={props.handleChange}
          />
          <button className="button primary full">Submit</button>
          <footer>
            {
              props.what === 'login' ?
                <span onClick={props.registerClick}>register</span> :
                <span onClick={props.loginClick}>Login</span>
            }
          </footer>
        </form>
      </div>
    );
  };

  if (props.what === 'login') {
    renderForm = login();
  } else {
    renderForm = register();
  }

  return (
    <div className="AuthForm">
      <h4>{props.appName}</h4>
      <p>{props.appTagline}</p>
      <br/>

      {renderForm}

      {props.error && <div className="error">{props.error}</div>}

    </div>
  );
};

export default AuthForm;
