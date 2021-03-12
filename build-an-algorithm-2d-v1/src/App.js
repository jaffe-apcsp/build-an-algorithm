import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import reducer from './reducer';
import initState from './initState';
import Login from './Login';
import Canvas from './Canvas';
import Controls from './Controls';
import Header from './Header';
import Help from './Help';
import C from './Constants';
import { Container, Row, Col } from 'reactstrap';
import CodeWindow from "./CodeWindow";
import config from './config';
import firebase from 'firebase/app';
import 'firebase/database';

function App() {

  const props = null;
  const [state, dispatch] = useReducer(reducer, props, initState);
  const [levelTrial, setLevelTrial] = useState('');
  const [db, setDb] = useState(null);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    setDb(firebase.database());
  }, []);

  useEffect(() => {
    let levelFileName = 'levels/'+state.level+'.json';
    fetch(levelFileName)
      .then(res => res.json())
      .then(levelData => {
        dispatch({type: C.ACTIONS.SET_LEVEL_DATA, levelData});
      })
      .catch(e => {
        console.log(e)
      });
  }, [state.level]);

  useEffect(() => {
    if (!db) return;
    db.ref(state.userHash).set({
      studentId: state.studentId,
      level: state.level,
      trial: state.trial
    });
  }, [state.level, state.trial]);

  useEffect(() => {
    if (!db) return;
    db.ref(state.userHash).once('value')
      .then(snap => {
        let {level, trial, studentId} = snap.val();
        dispatch({type: C.ACTIONS.SET_FB_DATA, level, trial, studentId});
        console.log(snap.val());
      })
  }, [state.userHash]);

  useEffect(() => {
    if (state.userHash.length === 0) {
      setLevelTrial('');
    } else if (state.finished || (state.level >= C.MAX_LEVEL)) {
      setLevelTrial("- Congratulations, you've finished!!");
    } else {
      setLevelTrial('- Level ' + (state.level + 1) + ' | Trial ' + (state.trial + 1));
    }
  }, [state.finished, state.level, state.trial, state.studentId]);

  return (
    <Container className="app">
      <Row>
        <Col>
          <header className="">
            <h1>Build an Algorithm {levelTrial}</h1>
          </header>
        </Col>
      </Row>
      {
        state.userHash === '' ?
          <Login dispatch={dispatch} /> :
          <Row className="player">
            <audio loop src="music.wav" autoPlay></audio>
            <Col lg={6} className="canvas">
              <Header {...state} dispatch={dispatch} />
              <Canvas {...state} dispatch={dispatch} />
              <Controls {...state} dispatch={dispatch} />
            </Col>
            <Col lg={6} className="program-window">
              {
                state.codes ?
                  <div>
                  {
                    state.codes.map((code, idx) =>
                      <CodeWindow code={code}
                                  codeWindow={idx+''}
                                  procIdx={state.procIdx}
                                  step={state.step}
                                  dispatch={dispatch}
                                  selected={state.codeWindow+'' === idx+''}
                                  key={'codeWin'+idx} />)
                  }
                  <Help {...state} />
                  </div> :
                  null
              }
            </Col>
          </Row>
      }
    </Container>
  );
}

export default App;
