import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ac from '../reducer/actionCreators';
import { GAME_COMPLETE, LOCAL_STORAGE_BLOCK_KEY, MAX_LEVEL } from "../utilities/constants";
import Header from './Header';
import Board from "./Board";
import GameComplete from "./GameComplete";
import CodeWindow from "./CodeWindow";
import BlockPalette from './BlockPalette';
import RunButton from "./RunButton";
import Login from './Login';
import Help from "./Help";
import { version } from '../../package.json';

const mapStateToProps = state => ({
  level: state.level,
  value: state.value,
  gameState: state.gameState,
  lsKey: state.lsKey
});

const App = props => {

  const { loadLevelAndTrial, loadSavedBlocks, login } = props;
  const [loginState, setLoginState] = useState(true);

  useEffect(() => {
    let savedLevelAndTrial = JSON.parse(localStorage.getItem(props.lsKey));
    savedLevelAndTrial = savedLevelAndTrial ? (savedLevelAndTrial.level < MAX_LEVEL ? savedLevelAndTrial : {level: 0, trial: 0}) : {level: 0, trial: 0}
    loadLevelAndTrial(savedLevelAndTrial);
  }, [loadLevelAndTrial, props.lsKey])

  useEffect(() => {
    let savedBlocks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BLOCK_KEY));
    if (savedBlocks) {
      loadSavedBlocks(savedBlocks);
    }
  }, [loadSavedBlocks, props.lsKey])

  const goBackToLevel1 = evt => {
    loadLevelAndTrial({level: 0, trial: 0});
  }

  const loginClick = lsKey => {
    login(lsKey);
    setLoginState(false);
  }

  if (loginState) {
    return <div className="app">
      <Login loginClick={loginClick} />
    </div>
  } else if (props.gameState === GAME_COMPLETE) {
    return (
      <div className="app">
        <GameComplete />
      </div>
    )
  } else if (props.level >= 0) {
    return (
      <div className="app">
        <Header/>
        <div className="canvas">
          <div className="left-side">
            <div className="board">
              <Board/>
            </div>
          </div>
          <div className="right-side">
            <div>
              <table className="control-table">
                <tbody>
                  <tr>
                    <td className="control-table-button">
                      <RunButton />
                    </td>
                    <td width="70%">
                      <BlockPalette/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <CodeWindow name={'main'} text={'Main'} abbrev={''}/>
              <CodeWindow name={'p1'} text={'Procedure 1'} abbrev={'P1'}/>
              <CodeWindow name={'p2'} text={'Procedure 2'} abbrev={'P2'}/>
            </div>
            <div>
              <CodeWindow name={'l1'} text={'Loop 1'} abbrev={'L1'}/>
              <CodeWindow name={'l2'} text={'Loop 2'} abbrev={'L2'}/>
            </div>
          </div>
        </div>
        <Help />
        <div className="centered">
          <button onClick={goBackToLevel1}>Go back to Level 1</button>
        </div>
        <div className="version">Version: {version}</div>
      </div>
    )
  } else {
    return (<div className="app">Loading...</div>)
  }
}

const actionCreators = {
  loadLevelAndTrial: ac.loadLevelAndTrial,
  loadSavedBlocks: ac.loadSavedBlocks,
  login: ac.login
};

export default connect(
  mapStateToProps,
  actionCreators
)(App);
