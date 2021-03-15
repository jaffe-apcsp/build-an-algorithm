import 'aframe';
import React from 'react';
import { Entity } from "aframe-react";
import C from './Constants';

/**
 * Horizontal divider component for the code blocks table
 * @param props: Required props
 *              cellSpan
 *              zCenter
 *              color
 *              text
 * @returns {*} Component
 * @constructor
 */

const Caption = props => {

  return (
    <Entity id="caption"
            geometry={{primitive: 'plane', height: C.CAPTION_HEIGHT, width: (props.cellSpan * C.CODE_BLOCK_SIZE)+((C.CODE_BLOCK_SIZE - C.CODE_BLOCK_SCALE) * 2)}}
            position={{
              x:-0.5+(props.cellSpan * C.CODE_BLOCK_SIZE)/2,
              y:0.80,
              z:props.zCenter
            }}
            material={{color: props.color}}
            text={{value: props.text, align: 'center', baseline: 'center', width: C.CAPTION_TEXT_SIZE}} />
  );
};

export default Caption;
