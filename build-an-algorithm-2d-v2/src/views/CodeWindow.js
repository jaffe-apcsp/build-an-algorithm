import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { CODE_WINDOW_BLOCKS } from "../utilities/constants";
import CodeBlock from "./CodeBlock";
import EmptyBlock from "./EmptyBlock";
import blockDragDrop from "../utilities/blockDragDrop";
import Iterations from "./Iterations";
import IterationsLeft from "./IterationsLeft";
import ac from "../reducer/actionCreators";
const R = require('ramda');

const mapStateToProps = (state, ownProps) => {
  return {
    enabled: state[ownProps.name].enabled,
    iterations: state[ownProps.name].iterations,
    blocks: state[ownProps.name].blocks,
    max: state[ownProps.name].max,
    callStack: state.callStack,
    // index: state[ownProps.name].index,
    selectedCodeWindow: state.selectedCodeWindow,
    name: ownProps.name,
    text: ownProps.text,
    draggable: state.draggable
  }
}

const CodeWindow = props => {

  const [blocks, setBlocks] = useState([]);

  const onClick = parms => {
    props.codeBlockClicked(parms);
  }

  const onSetSelectedCodeWindow = evt => {
    let name = evt.currentTarget.getAttribute('data-name');
    props.setSelectedCodeWindow(name);
  }

  const up = evt => {
    props.iterationsUp(props.name);
  }

  const down = evt => {
    props.iterationsDown(props.name);
  }

  useEffect(() => {
    let savedData = localStorage.getItem(props.name);
    console.log(savedData);
  }, [props.name])

  useEffect(() => {
    let blocks = R.clone(props.blocks);
    setBlocks(blockDragDrop(props.name, blocks, props.draggable));
  }, [props.name, props.blocks, props.draggable])

  let table = [];
  let func = R.find(item => {
    return item.name === props.name
  }, props.callStack);
  // for (let idx = 0; idx < props.max; idx++) {
  for (let idx = 0; idx < CODE_WINDOW_BLOCKS; idx++) {
    let active = func && func.index === idx;
    table.push(
      <td key={'cw'+idx} draggable={true} className={idx >= props.max ? 'code-block-hide-cell' : ''}>
        {
          idx < props.max ?
            <CodeBlock index={idx}
                       name={props.name}
                       onClick={onClick}
                       block={blocks[idx] ? blocks[idx] : ''}
                       active={active}
                       dropNotAllowed={idx > blocks.length} /> :
            <EmptyBlock />
        }
      </td>
    );
  }

  let className = "code-window-text-left code-window" +
    (props.name === props.selectedCodeWindow ? ' code-window-selected' : '');
  if (props.enabled || props.name === 'main') {
    return (
      <div className={className}>
        <table>
          <thead>
            <tr>
              <td colSpan={4}><button onClick={onSetSelectedCodeWindow} data-name={props.name} className="code-window-title">{props.text} {props.abbrev ? `(${props.abbrev})` : ''}</button></td>
              <td colSpan={4} className="iterations-left">
                {
                  func && props.iterations !== undefined ?
                    <IterationsLeft iterationsLeft={func.iterationsLeft} /> : null
                }
              </td>
              <td colSpan={4} className="iterations-container">
                {
                  props.iterations ?
                    <Iterations iterations={props.iterations}
                                down={down}
                                up={up} /> :
                    null
                }
              </td>
            </tr>
          </thead>
          <tbody>
          <tr>
            {table}
          </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    return null;
  }
}

const actionCreators = {
  setSelectedCodeWindow: ac.setSelectedCodeWindow,
  codeBlockClicked: ac.codeBlockClicked,
  iterationsUp: ac.iterationsUp,
  iterationsDown: ac.iterationsDown
};

export default connect(
  mapStateToProps,
  actionCreators
)(CodeWindow);
