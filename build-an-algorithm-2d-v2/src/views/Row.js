import React from 'react';
import { connect } from 'react-redux';
import Cell from "./Cell";

const mapStateToProps = (state, ownProps) => {
  return {board: state.board, rowIdx: ownProps.rowIdx}
}

const Row = props => {

  return (
    <tr>
      {
        props.board[props.rowIdx].map((cell, colIdx) => {
          return (
            <Cell key={'row'+props.rowIdx+'col'+colIdx} cell={cell} rowIdx={props.rowIdx} colIdx={colIdx} />
          )
        })
      }
    </tr>
  );
}

const actionCreators = {};

export default connect(
  mapStateToProps,
  actionCreators
)(Row);
