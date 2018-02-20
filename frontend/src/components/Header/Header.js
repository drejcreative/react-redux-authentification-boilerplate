import React from 'react';

const Header = (props) => {
  return (
    <header>
      wellcome {props.user}
      <button onClick={props.logout}>Logout</button>
    </header>
  );
};

export default Header;
