import 'aframe';
import {Entity} from "aframe-react";
import C from "./Constants";
import utilities from "./utilities";
import concrete from "./assets/concrete.jpg";
import React from "react";
import makeyTheRobot from './assets/MakeyTheRobot.obj';

// Properties:
//  row
//  col
//  height
//  color

const Robot = props => {

  // <a-entity id="robot" robot-factory robot-direction remove-after-fall="whatToDo: hide" position="0 0 0">
  //   <a-entity mixin="robot-mixin"
  //             id="robot-obj"
  //             name="robot-obj"
  //   >
  //   </a-entity>
  //   <a-entity id="arrow"
  //             rotation="0 180 0"
  //             position="0 0.741 0"
  //             scale="0.25 0.25 0.25">
  //     <a-entity mixin="arrow-stem-mixin"
  //               id="arrow-stem"
  //               name="arrow-stem">
  //     </a-entity>
  //     <a-entity mixin="arrow-point-mixin"
  //               id="arrow-point"
  //               name="arrow-point">
  //     </a-entity>
  //   </a-entity>
  // </a-entity>

  // <a-asset-item id="makey-obj" src="assets/MakeyTheRobot.obj" />
  // <a-mixin id="robot-mixin"
  // obj-model="obj: #makey-obj;"
  // material="color: #ff6600"
  // position="0 0 0"
  // scale="0.04 0.04 0.04">
  //   </a-mixin>
  // <a-mixin id="arrow-mixin"
  //          geometry="primitive: triangle"
  //          rotation="-90 180 0"
  //          position="0 0.753 0.065"
  //          scale="0.5 0.5 0.5"
  //          material="side: double; color: #000000">
  // </a-mixin>

  return (
    <Entity id="robot"
            position={utilities.rowColHeightToPosition(props.row, props.col, props.height+1)}
            >
      <Entity id="robot-obj"
              obj-model={{obj: makeyTheRobot}}
              material={{color: '#ff6600'}}
              position={{x:0, y:0, z:0}}
              scale={{x:0.04, y:0.04, z:0.04}}
              />
      <Entity id="arrow"
              rotation={{x:0, y:180, z:0}}
              position={{x:0, y:0.741, z:0}}
              scale={{x:0.25, y:0.25, z:0.25}}
              >
        <Entity id="arrow-stem-mixin"
                position={{x:0, y:0, z:0}}
                rotation={{x:-90, y:0, z:0}}
                geometry={{primitive: 'plane', height: 0.5, width: 0.25}}
                material={{color: 'black'}}
                />
        <Entity id="arrow-point-mixin"
                position={{x:0, y:0, z:-0.71}}
                rotation={{x:-90, y:0, z:0}}
                geometry={{primitive: "triangle",
                           vertexA: '0 0.5 0',
                           vertexB: '-0.5 -0.5 0',
                           vertexC: '0.5 -0.5 0'
                         }}
                material={{color: 'black'}}
                />
      </Entity>
    </Entity>
  )

};

export default Robot;
