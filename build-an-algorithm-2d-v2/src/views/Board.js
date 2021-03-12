import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Row from './Row';
import {MAX_ROWS} from "../utilities/constants";

const mapStateToProps = state => ({board: state.board});

const Board = props => {

  const [rowToStop, setRowToStop] = useState(null);

  useEffect(() => {
    let found = false, lastRow = MAX_ROWS;
    for (let row = props.board.length-1; row >= 0 && !found; row--) {
      let nonEmptyCell = props.board[row].find(cell => cell.length > 0);
      if (nonEmptyCell) {
        lastRow = row;
        found = true;
      }
    }
    setRowToStop(lastRow);
  }, [props.board]);

  return (
    <div className="code-window">
      <table>
        <tbody>
        {
          props.board.map((row, rowIdx) => rowIdx <= rowToStop ? <Row key={'row'+rowIdx} rowIdx={rowIdx} /> : null)
        }
        </tbody>
      </table>
    </div>
  );
}

const actionCreators = {};

export default connect(
  mapStateToProps,
  actionCreators
)(Board);
