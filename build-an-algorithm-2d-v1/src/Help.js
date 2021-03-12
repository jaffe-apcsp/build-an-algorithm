import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button } from 'reactstrap';
import './Help.css';

const Help = props => {

  if (props.help) {
    return (
      <Row className="help-window">
        <Col md={12}>
          {
            props.help.map((msg, idx) => <h4 key={'help'+idx} dangerouslySetInnerHTML={{__html:msg}}></h4>)
          }
        </Col>
      </Row>
    );
  } else {
    return null;
  }

};

export default Help
