import 'aframe';
import React, { useState } from 'react';
import { Entity } from "aframe-react";
import C from './Constants';

/**
 * Horizontal divider component for the code blocks table
 * @param props: Required props
 *              index
 *              zCenter
 *              colCount
 *              imageSrc
 *              instruction
 *
 * @returns {*} Component
 * @constructor
 */

const Instruction = props => {

  const [color, setColor] = useState('white');

  const mouseEnter = () => setColor(C.INSTRUCTION_SELECTED_COLOR);
  const mouseLeave = () => setColor(C.INSTRUCTION_UNSELECTED_COLOR);

  const row = parseInt(props.index / props.colCount, 10);
  const col = props.index % props.colCount;

  const click = evt => {
    let el = evt.currentTarget;
    let instruction = el.getAttribute('instruction');
    let index = el.getAttribute('index');
    let procIdx = el.getAttribute('procIdx');
    let clickAction = el.getAttribute('clickAction');
    if (clickAction === 'add') {
      props.dispatch({type: 'ADD_CODE_BLOCK', instruction})
    } else if (clickAction === 'remove') {
      props.dispatch({type: 'REMOVE_CODE_BLOCK', procIdx, index});
    }
  };

  const dsHandler = evt => {
    console.log('drag-start');
  };

  return (
    <Entity geometry={{primitive: 'plane', height: 1, width: 1}}
            material={{src: props.imageSrc, color: color}}
            scale={{
              x:C.INSTRUCTION_BLOCK_SCALE,
              y:C.INSTRUCTION_BLOCK_SCALE,
              z: C.INSTRUCTION_BLOCK_SCALE
            }}
            position={{x:col, y:-row, z:props.zCenter}}
            instruction={props.instruction}
            procIdx={props.procIdx}
            index={props.index}
            clickAction={props.clickAction}
            events={{
              mouseenter: mouseEnter,
              mouseleave: mouseLeave,
              click: click
            }}
    />
  );
};

export default Instruction;
