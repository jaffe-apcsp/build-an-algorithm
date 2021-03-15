import 'aframe';
import React from 'react';
import { Entity } from "aframe-react";
import Procedure from "./Procedure";

const Procedures = props => {

  let procs = [];

  for (let i = 0; i < props.code.length; i++) {
    procs.push(
      <Procedure top={2.7}
                 center={1.5}
                 blocks={props.code[i]}
                 procIdx={i}
                 key={'procedure'+i}
                 dispatch={props.dispatch}
                 selected={false}
      />
    )
  }
  return procs;
};

export default Procedures;
