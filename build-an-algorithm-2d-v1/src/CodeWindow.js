import React from 'react';
import './CodeWindow.css';
import C from './Constants';
import { Button, Row, Col } from 'reactstrap';
import { AiOutlineArrowUp, AiOutlineBulb } from 'react-icons/ai';
import { BsArrow90DegLeft, BsArrow90DegRight } from 'react-icons/bs';
import forwardImg from "./images/forward.png";
import rightImg from "./images/right.png";
import leftImg from "./images/left.png";
import lightImg from "./images/light.png";
import p1Img from "./images/p1Img.png";
import p2Img from "./images/p2Img.png";

const R = require('ramda');

const CodeWindow = props => {

  const select = evt => {
    props.dispatch({type: C.ACTIONS.SELECT_CODE_WINDOW, codeWindow: props.codeWindow});
  };

  const remove = evt => {
    let idx = evt.currentTarget.parentNode.getAttribute('data-idx');
    props.dispatch({type: C.ACTIONS.REMOVE_BLOCK, codeWindow: props.codeWindow, idx})
  };

  const dragStart = evt => {
    let idx = evt.currentTarget.getAttribute('data-idx');
    evt.dataTransfer.setData('text/plain', idx);
    console.log(evt.currentTarget.id);
  };

  const drop = evt => {
    evt.preventDefault();
    let srcIdx = evt.dataTransfer.getData('text/plain');
    let destIdx = evt.currentTarget.getAttribute('data-idx');
    props.dispatch({type: C.ACTIONS.DRAG_DROP, codeWindow: props.codeWindow, srcIdx, destIdx});
  };

  const dragOver = evt => {
    evt.preventDefault();
  };

  let table = R.range(0, 3).map(row => R.range(0,4).map(item => null));

  const getButton = (i, content, onClick, active) => <Button key={'pb'+i}
                                                             className="code-image"
                                                             size="lg"
                                                             color={active ? 'primary' : 'secondary'}
                                                             onClick={onClick}>{content}</Button>

  const renderTable = blocks => {
    blocks.map((block, idx) => {
      let row = parseInt(idx / 4);
      let col = idx % 4;
      let button = null;
      let {active, inst} = block;
      switch (inst) {
        case 'forward': button = getButton(idx, <AiOutlineArrowUp />, remove, active); break;
        case 'left': button = getButton(idx, <BsArrow90DegLeft />, remove, active); break;
        case 'right': button = getButton(idx, <BsArrow90DegRight />, remove, active); break;
        case 'light': button = getButton(idx, <AiOutlineBulb />, remove, active); break;
        default: button = getButton(idx, inst.toUpperCase(), remove, active); break;
      }
      table[row][col] = button;
    });
    table = table.reduce((_table, row, idx) => {
      _table.push(
        <tr key={idx}>
          <td data-idx={idx*4}
              draggable onDrop={drop}
              onDragOver={dragOver}
              onDragStart={dragStart}
              className={"instruction"}>{row[0]}</td>
          <td data-idx={idx*4+1}
              draggable
              onDrop={drop}
              onDragOver={dragOver}
              onDragStart={dragStart}
              className={"instruction"}>{row[1]}</td>
          <td data-idx={idx*4+2}
              draggable
              onDrop={drop}
              onDragOver={dragOver}
              onDragStart={dragStart}
              className={"instruction"}>{row[2]}</td>
          <td data-idx={idx*4+3}
              draggable
              onDrop={drop}
              onDragOver={dragOver}
              onDragStart={dragStart}
              className={"instruction"}>{row[3]}</td>
        </tr>
      );
      return _table;
    }, []);
    return table;
  };

  return (
    <Row className="center-code">
      <Col md={{size:8, offset:2}}>
        <div onClick={select} className={props.selected ? 'selected' : 'not-selected'}>
          <table id="main" className="editor">
            <thead>
            <tr>
              <th colSpan="3" className="editor-header-title">{props.codeWindow === '0' ? 'Main' : 'Procedure '+props.codeWindow}</th>
              <th>
                <Button size="sm" color="primary" disabled={props.selected} onClick={select}>Select</Button>
              </th>
            </tr>
            </thead>
            <tbody>
              {renderTable(props.code)}
            </tbody>
          </table>
        </div>
      </Col>
    </Row>
  )
};

export default CodeWindow;
