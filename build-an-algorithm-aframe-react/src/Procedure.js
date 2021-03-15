import 'aframe';
import React from 'react';
import { Entity } from "aframe-react";
import Caption from "./Caption";
import Divider from "./Divider";
import Instruction from "./Instruction";
import Dividers from "./Dividers";
import C from "./Constants";

// Properties
//  top
//  center
//  blocks
//  selected
const Procedure = props => {

  const caption = <Caption id="caption"
                           cellSpan={4}
                           zCenter={0}
                           color={"black"}
                           text={props.procIdx === 0 ? 'Main procedure' : 'Procedure '+props.procIdx}
                  />;

  let instructions = [];
  for (let i = 0; i < props.blocks.length; i++) {
    let image = require('./assets/'+props.blocks[i]+'.png');
    instructions.push(
      <Instruction zCenter={0}
                   imageSrc={image}
                   index={i}
                   colCount={C.CODE_BLOCK_COL_COUNT}
                   key={'codeblocks'+props.procIdx+'_'+i}
                   procIdx={props.procIdx}
                   dispatch={props.dispatch}
                   clickAction='remove'
                   instruction={props.blocks[i]}/>
    )
  }

  return (
    <Entity id={'proc'+props.procIdx}
            position={{x:3, y:5-(props.procIdx*4), z:-8}}
            >
      {caption}
      <Dividers numRows={3}
                numCols={4}
                color={'black'}
                procNum={props.procIdx}
                />
      {instructions}
    </Entity>
  );
};


export default Procedure;
