import 'aframe';
import 'aframe-curve-component';
import React from "react";
import C from "./Constants";
import utilities from "./utilities";

const Curve = props => {

  let sp = utilities.rowColHeightToPosition(props.row, props.col, props.height);
  let newRow = props.row + C.DIRECTION_DELTA[props.direction].row;
  let newCol = props.col + C.DIRECTION_DELTA[props.direction].col;
  let newHeight = utilities.rowColInBounds(newRow, newCol, props.cells) ? props.cells[newRow][newCol] & 7 : props.cells[props.row][props.col];
  let ep = utilities.rowColHeightToPosition(newRow, newCol, newHeight);
  let mp = utilities.computeMidBezierPosition(sp, ep);
  sp.y += 1;
  mp.y += 1;
  ep.y += 1;

  return (
    <a-curve id="jump" type="QuadraticBezier">
      <a-curve-point id="bezier-0" position={sp.x+' '+sp.y+' '+sp.z} />
      <a-curve-point id="bezier-1" position={mp.x+' '+mp.y+' '+mp.z} />
      <a-curve-point id="bezier-2" position={ep.x+' '+ep.y+' '+ep.z} />
    </a-curve>
  )

};

export default Curve;
