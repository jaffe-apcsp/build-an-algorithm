import React, { useState } from 'react';
import { connect } from 'react-redux';
import ac from "../reducer/actionCreators";

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
