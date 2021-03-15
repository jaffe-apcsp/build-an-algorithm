import 'aframe';
import React, { useReducer } from 'react';
import { Entity } from "aframe-react";
import CodeInstructions from './CodeInstructions';
import Procedures from './Procedures';

const Rig = props => {

  return (
    <Entity id="rig"
            position="0 6 6"
            rotation="-40 0 0">
      <Entity primitive="a-camera"
              look-controls={{enabled: false}}
              wasd-controls={{enabled: false}}>
        <CodeInstructions {...props} />
        <Procedures {...props} />
      </Entity>
    </Entity>
  );
};


export default Rig;
