import 'aframe';
import React from 'react';
import { Entity } from "aframe-react";
import C from './Constants';

/**
 * Divider component for the code blocks tables
 * @param props: Required props
 *              type: 'horizontal' || 'vertical'
 *              cellSpan: Number of rows/cols to span
 *              zCenter: z coordinate
 *              index: index'th divider line, starting at top or left side
 *              color
 * @returns {*} Component
 * @constructor
 */

const Divider = props => {

  if (props.type === 'horizontal') {
    return (
      <Entity geometry={{
                primitive: 'plane',
                height: (C.CODE_BLOCK_SIZE - C.CODE_BLOCK_SCALE) * 2,
                width: (props.cellSpan * C.CODE_BLOCK_SIZE) + ((C.CODE_BLOCK_SIZE - C.CODE_BLOCK_SCALE) * 6)
              }}
              material={{color: props.color}}
              scale={{x:C.CODE_BLOCK_SCALE, y:C.CODE_BLOCK_SCALE, z:C.CODE_BLOCK_SCALE}}
              position={{
                x:-0.5+(props.cellSpan * C.CODE_BLOCK_SIZE) / 2,
                y:0.5-(props.index * C.CODE_BLOCK_SIZE),
                z:props.zCenter
              }} />
    );
  } else if (props.type === 'vertical') {
    return (
      <Entity geometry={{
                primitive: 'plane',
                height: (props.cellSpan * C.CODE_BLOCK_SIZE) + ((C.CODE_BLOCK_SIZE - C.CODE_BLOCK_SCALE) * 3),
                width: (C.CODE_BLOCK_SIZE - C.CODE_BLOCK_SCALE) * 2,
              }}
              material={{color: props.color}}
              scale={{x:C.CODE_BLOCK_SCALE, y:C.CODE_BLOCK_SCALE, z:C.CODE_BLOCK_SCALE}}
              position={{
                x:-0.5+(props.index * C.CODE_BLOCK_SIZE),
                y:0.5-(props.cellSpan * C.CODE_BLOCK_SIZE) / 2,
                z:props.zCenter
              }} />
    );
  } else {
    return null;
  }
};


export default Divider;
