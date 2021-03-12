import React, { useState, useRef, useEffect } from "react";
import C from './Constants';
import {Button, Col, Row} from 'reactstrap';
import './Canvas.css';
import directionArrow from "./images/directionArrow.png";
import directionArrow2 from './images/arrow-up.png';
import forwardImg from "./images/forward.png";
import rightImg from "./images/right.png";
import leftImg from "./images/left.png";
import lightImg from "./images/light.png";

const R = require('ramda');

const Canvas = props => {

  const [tableRect, setTableRect] = useState(null);
  const tableEl = useRef(null);

  useEffect(() => {
    if (tableEl.current) {
      let rect = tableEl.current.getBoundingClientRect();
      setTableRect(rect);
      console.log(rect);
    }
  }, [tableEl.current])

  /**
   * Renders a cell according to the provided data
   * obj.row:       row to be rendered
   * obj.col:       col to be rendered
   * obj.levelData: Cell data from the current level
   * obj.position:  Current sprite position
   * obj.direction: Current sprite direction
   * returns the HTML for the cell
   */
  const renderCell = obj => {

    let { row, col, cell, position, direction, finish } = obj;
    let className = ['room-cell'];
    if (cell === C.CELL_STATES.INACTIVE) className.push('inactive');
    if ((cell & C.CELL_STATES.ACTIVE) > 0) className.push('active');
    if ((cell & C.CELL_STATES.SHOULD_LIGHT) > 0) className.push('should-light');
    if ((cell & C.CELL_STATES.VISITED) > 0) className.push('visited');
    if ((cell & C.CELL_STATES.LIT) > 0) className.push('lit');
    if ((cell & C.CELL_STATES.FINISH) > 0) className.push('finish');
    if ((cell & C.CELL_STATES.START) > 0) className.push('start');
    if ((cell & C.CELL_STATES.OCCUPIED) > 0) {
      className.push('occupied');
      if ((cell & C.CELL_STATES.NORTH) > 0) className.push('occupied-north');
      if ((cell & C.CELL_STATES.EAST) > 0) className.push('occupied-east');
      if ((cell & C.CELL_STATES.SOUTH) > 0) className.push('occupied-south');
      if ((cell & C.CELL_STATES.WEST) > 0) className.push('occupied-west');
    }
    let text = ' ';
    if ((cell & C.CELL_STATES.SHOULD_LIGHT) > 0) text = "Light me up";
    if ((cell & C.CELL_STATES.LIT) > 0) text = "I'm lit up";
    if ((cell & C.CELL_STATES.FINISH) > 0) text = "Finish";
    return <td className={className.join(' ')} key={row+'-'+col}>{text}</td>;
  };

  if (props.cells) {
    let cells = props.cells.map((cellRow, row) => {
      return cellRow.map((cell, col) => {
        return renderCell({
          finish: props.finish.row === row && props.finish.col === col,
          row,
          col,
          cell,
          position: props.position,
          direction: props.direction,
        })
      })
    });

    return (
      <Row>
        <Col md="12">
          <table className="room" ref={tableEl}>
            <thead>

            </thead>
            <tbody>
            {
              cells.map((row, rowIdx) => {
                return (
                  <tr className="room-row" key={'row' + rowIdx}>
                    {
                      row.map((col, colIdx) => col)
                    }
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </Col>
      </Row>
    )
  } else {
    return null
  }
};

export default Canvas;
