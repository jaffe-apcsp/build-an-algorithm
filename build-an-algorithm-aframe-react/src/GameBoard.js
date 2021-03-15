import 'aframe';
import React, { useReducer } from 'react';
import { Entity } from "aframe-react";
import C from './Constants';
import Box from './Box';
import Robot from './Robot';
import Curve from './Curve';

const GameBoard = props => {

  let boxes = [];

  props.cells.forEach((cellRow, row) => {
    cellRow.forEach((cell, col) => {
      if (cell === 0) return;
      let height = cell & 7;
      for (let h = 1; h <= height; h++) {
        let color = ((h === height) && ((cell & C.SHOULD_LIGHT) > 0)) ?
          '#0ff' : '#aaa';
        boxes.push(<Box row={row}
                        col={col}
                        height={h}
                        color={color}
                        key={'box'+row+col+h}
                   />
        )
      }
    })
  });

  return (
    <Entity id="game-board"
            position={{x:C.GAME_BOARD_X_OFFSET, y:0, z:0}}
    >
      <Curve {...props} />
      {boxes}
      <Robot row={props.row}
             col={props.col}
             height={props.height}
      />
    </Entity>
  )
};


export default GameBoard;
