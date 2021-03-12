import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button } from 'reactstrap';
import Controller from './Controller';
import C from "./Constants";
import "./Header.css";

const R = require('ramda');

const Header = props => {

  const [disableTrigger, setDisableTrigger] = useState(false);
  const [controller, setController] = useState(null);
  const [message, setMessage] = useState('');

  let gameStateButtons = [
    {color: 'success', text: 'Run!'},       // Standby
    {color: 'danger', text: 'Stop'},        // Running
    {color: 'warning', text: 'Reset'},   // Incomplete
    {color: 'success', text: 'Next level!'}, // Complete
    {color: 'warning', text: 'Reset'}    // Error
  ];

  useEffect(() => {
    let disable = props.codes[0].length === 0 || props.finished;
    setDisableTrigger(disable);
  }, [props.codes]);

  useEffect(() => {
    setMessage('');
    if (props.finishInWrongSpot) setMessage('Finished in the wrong spot');
    if (props.notAllLit) setMessage('Required spots are not lit');
    if (props.tooManyLit) setMessage('You lit too many cells');
    if (props.invalidPosition) setMessage('You went off the board');
    if (props.success) setMessage('Level '+(props.level+1)+' completed!');
  }, [props.gameState, props.finishInWrongSpot, props.notAllLit,
            props.invalidPosition, props.success, props.level]);

  const trigger = () => {
    if (props.gameState === C.GAME_STATE.STANDBY) {
      props.dispatch({type: C.ACTIONS.TRIGGER});
      let _controller = Controller(props);
      _controller.start();
      setController(_controller);
    } else if (props.gameState === C.GAME_STATE.RUNNING) {
      props.dispatch({type: C.ACTIONS.RESET});
      controller.stop();
      setController(null);
    } else if (props.gameState === C.GAME_STATE.ERROR) {
      props.dispatch({type: C.ACTIONS.RESET});
      setController(null);
    } else if (props.gameState === C.GAME_STATE.COMPLETE) {
      props.dispatch({type: C.ACTIONS.NEXT_LEVEL});
      setController(null);
    } else if (props.gameState === C.GAME_STATE.INCOMPLETE) {
      props.dispatch({type: C.ACTIONS.RESET});
      setController(null);
    }
  };

  return (
    <Row className="level-controls">
      <Col md={8}>
        <h4>{message}</h4>
      </Col>
      <Col md={4}>
        <Button block disabled={disableTrigger} onClick={trigger} color={gameStateButtons[props.gameState].color}>{gameStateButtons[props.gameState].text}</Button>
      </Col>
    </Row>
  );
};

export default Header
