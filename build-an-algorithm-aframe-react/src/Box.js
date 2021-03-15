import 'aframe';
import 'aframe-alongpath-component';
import {Entity} from "aframe-react";
import C from "./Constants";
import utilities from "./utilities";
import concrete from "./assets/concrete.jpg";
import React from "react";

// Properties:
//  row
//  col
//  height
//  color

const Box = props => {

  return <Entity key={'box_' + props.row + '_' + props.col + '_' + props.height}
                 name='box'
                 row={props.row}
                 col={props.col}
                 geometry={{primitive: 'box'}}
                 scale={{x: C.BOX_SCALE, y: C.BOX_SCALE, z: C.BOX_SCALE}}
                 position={utilities.rowColHeightToPosition(props.row, props.col, props.height)}
                 material={{src: concrete, color: props.color}}
  />

};

export default Box;
