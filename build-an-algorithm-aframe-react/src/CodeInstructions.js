import 'aframe';
import React from 'react';
import { Entity } from "aframe-react";
import Dividers from "./Dividers";
import Caption from "./Caption";
import Instruction from "./Instruction";
import C from "./Constants";

const CodeInstructions = props => {

  // Instruction blocks
  let instructions = [];
  for (let i=0; i < props.blocks.length; i++) {
    let image = require('./assets/'+props.blocks[i]+'.png');
    instructions.push(
      <Instruction zCenter={0}
                   imageSrc={image}
                   index={i}
                   colCount={props.blocks.length}
                   key={'codeblocks'+i}
                   instruction={props.blocks[i]}
                   clickAction='add'
                   dispatch={props.dispatch} />
    )
  }

  return (
    <Entity id="code-instructions"
            position="-5 5 -8">
      <Caption id="caption"
               cellSpan={props.blocks.length}
               zCenter={0}
               color={"black"}
               text={"Code blocks"}
      />
      <Dividers numRows={1}
                numCols={props.blocks.length}
                procNum={'codeBlocks'}
                color={'black'}
      />
      {instructions}
    </Entity>
  );
};


export default CodeInstructions;
