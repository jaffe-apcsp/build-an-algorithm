import 'aframe';
import React from 'react';
import Divider from "./Divider";

/**
 * Divider component for the code blocks table
 * @param props: Required props
 *              numRows
 *              numCols
 *              color
 *              procNum
 * @returns {*} Component
 * @constructor
 */

const Dividers = props => {

  let dividers = [];

  for (let i = 0; i <= props.numCols; i++) {
    dividers.push(
      <Divider type="vertical"
               cellSpan={props.numRows}
               zCenter={0}
               index={i}
               key={'proc-v'+props.procNum+i}
               color={props.color}
      />
    )
  }
  for (let i=0; i <= props.numRows; i++) {
    dividers.push(
      <Divider type="horizontal"
               cellSpan={props.numCols}
               zCenter={0}
               index={i}
               key={'proc-h'+props.procNum+i}
               color={props.color}
      />
    )
  }

  return dividers;
};

export default Dividers;
