import React from 'react';
import { connect } from 'react-redux';
import {COMPLETE, ERROR, RUNNING, STANDBY, DIRTY, MAX_LEVEL, GAME_COMPLETE, GAME_INCOMPLETE} from "../utilities/constants";
import ac from "../reducer/actionCreators";

const {opsStart, opsStop, opsReset, opsAbort, opsNewTrial, opsGameComplete, loadLevelAndTrial, clearProcedures} = ac;

const mapStateToProps = (state, ownProps) => ({
  gameState: state.gameState,
  errorReason: state.errorReason,
  level: state.level
});

const RunButton = props => {

  let className = '';
  let buttonText = '';

  const onClick = evt => {
    if (props.gameState === STANDBY) {
      props.opsStart();
    } else if (props.gameState === RUNNING) {
      props.opsAbort();
    } else if (props.gameState === COMPLETE) {
      let newLevel = props.level + 1;
      if (newLevel === MAX_LEVEL) {
        props.opsGameComplete();
      } else {
        props.loadLevelAndTrial({level: newLevel, trial: 0});
        props.clearProcedures();
      }
    } else if (props.gameState === DIRTY) {
      props.opsNewTrial();
      props.opsReset();
    } else if (props.gameState === ERROR) {
      props.opsNewTrial();
      props.opsReset();
    } else if (props.gameState === GAME_INCOMPLETE) {
      props.opsNewTrial();
      props.opsReset();
    }
  }

  switch (props.gameState) {
    case STANDBY: className = 'standby'; buttonText = 'GO!!'; break;
    case RUNNING: className = 'running'; buttonText = 'Stop'; break;
    case COMPLETE: className = 'complete'; buttonText = 'Next level'; break;
    case ERROR: className = 'error'; buttonText = props.errorReason; break;
    case DIRTY: className = 'reset'; buttonText = 'Reset'; break;
    case GAME_INCOMPLETE: className = 'error'; buttonText = 'Not complete'; break;
    case GAME_COMPLETE: className = 'standby'; buttonText = "You're done!"; break;
    default: break;
  }

  return <button className={'run-button '+className} onClick={onClick}>{buttonText}</button>

}

const actionCreators = {opsStart, opsStop, opsReset, opsAbort, opsNewTrial, opsGameComplete, loadLevelAndTrial, clearProcedures};

export default connect(
  mapStateToProps,
  actionCreators
)(RunButton);
