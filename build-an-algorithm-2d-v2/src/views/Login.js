import React, { useState } from 'react';
import { connect } from 'react-redux';
import ac from "../reducer/actionCreators";
import {LOCAL_STORAGE_KEY} from "../utilities/constants";

const mapStateToProps = (state, ownProps) => ({
  lsKey: state.lsKey
});

const {login} = ac;

const Login = props => {

  const [lsKey, setLsKey] = useState('');

  const onChange = evt => {
    setLsKey(evt.currentTarget.value);
  }

  const onClick = evt => {
    // Set the level / trial if provided in the URL parameters
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    try {
      const level = parseInt(urlParams.get('level'),0)-1;
      if (level) {
        localStorage.setItem(lsKey, JSON.stringify({level, trial: 0, lsKey}));
      }
    } catch(e) {}

    // Now login
    props.loginClick(lsKey);
  }

  return (
      <div className="login">
        <div className="login-container">
          <h5>Enter your name or ID number to resume your game</h5>
          <div>
            <input type="text" value={lsKey} onChange={onChange} />
          </div>
          <button onClick={onClick}>Continue game</button>
        </div>
      </div>
  )
}

const actionCreators = {login};

export default connect(
  mapStateToProps,
  actionCreators
)(Login);
