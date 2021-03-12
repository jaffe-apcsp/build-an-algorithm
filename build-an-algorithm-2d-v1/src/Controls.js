import React, { useState, useEffect, useReducer } from 'react';
import './Controls.css';
import C from './Constants';
import { Button, Container, Row, Col } from 'reactstrap';
import { AiOutlineArrowUp, AiOutlineBulb } from 'react-icons/ai';
import { BsArrow90DegLeft, BsArrow90DegRight } from 'react-icons/bs';
import forwardImg from "./images/forward.png";
import rightImg from "./images/right.png";
import leftImg from "./images/left.png";
import lightImg from "./images/light.png";
import p1Img from './images/p1Img.png';
import p2Img from './images/p2Img.png';

const R = require('ramda');

const Controls = props => {

  const [procButtons, setProcButtons] = useState([]);

  useEffect(() => {
    if (props.codes) {
      let controls = []
      for (let i=1; i<=props.codes.length-1; i++) {
        controls.push(<Button key={'pb'+i} className="control-spacer" size="lg" color="secondary" onClick={addControl('p'+i)}>{'P'+i}</Button>)
      }
      setProcButtons(controls);
    }
  }, [props.codes]);

  const addControl = block => evt => {
    props.dispatch({type: C.ACTIONS.ADD_BLOCK, block});
  };

  return (
    <Row className="controls">
      <Col md="12">
        <h5>Function blocks</h5>
        <h6>Click a block to add it to the selected code window</h6>
        <Button className="control-spacer" size="lg" color="secondary" onClick={addControl('forward')}><AiOutlineArrowUp /></Button>
        <Button className="control-spacer" size="lg" color="secondary" onClick={addControl('left')}><BsArrow90DegLeft /></Button>
        <Button className="control-spacer" size="lg" color="secondary" onClick={addControl('right')}><BsArrow90DegRight /></Button>
        <Button className="control-spacer" size="lg" color="secondary" onClick={addControl('light')}><AiOutlineBulb /></Button>
        {procButtons}
      </Col>
    </Row>
  );
};

export default Controls;
