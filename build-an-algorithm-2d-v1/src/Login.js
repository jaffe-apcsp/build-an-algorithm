import React, { useState, useEffect } from "react";
import C from './Constants';
import { Row, Col, Input, Label, Button, Form, FormGroup } from 'reactstrap';
import './Login.css';

const R = require('ramda');

export default props => {

  const [studentId, setStudentId] = useState('123456789');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(studentId.length === 0);
  }, [studentId])

  const onChange = evt => setStudentId(evt.currentTarget.value);

  const onClick = () => props.dispatch({type: C.ACTIONS.LOGIN, studentId});

  return (
    <Row>
      <Col lg={{size:6, offset:3}} className="login">
        <Form>
          <FormGroup>
            <Label>Enter your student ID number</Label>
            <Input type='password'
                   onChange={onChange}
                   value={studentId}
                   />
          </FormGroup>
          <Button disabled={disabled} color="secondary" onClick={onClick}>Login</Button>
        </Form>
      </Col>
    </Row>
  )
}
