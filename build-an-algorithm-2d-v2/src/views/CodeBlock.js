import React, { useState, useEffect } from 'react';
import ac from "../reducer/actionCreators";
import { connect } from 'react-redux';

const { dragStart, dragOver, dragEnter, dragLeave, dragExit, dragEnd, drop } = ac;

const mapStateToProps = (state, ownProps) => {
  return {
    block: ownProps.block,
    active: ownProps.active,
    index: ownProps.index,
    name: ownProps.name,
    dropNotAllowed: ownProps.dropNotAllowed,
    draggable: state.draggable,
    length: ownProps.name === 'palette' ? null : state[ownProps.name].blocks.length,
    selectedCodeWindow: state.selectedCodeWindow,
    onClick: ownProps.onClick,
    gameState: state.gameState
  }
}

const CodeBlock = props => {

  const [className, setClassName] = useState([]);

  const onClick = evt => {
    let target = evt.currentTarget;
    let from = target.getAttribute('data-name');
    let index = target.getAttribute('data-index');
    props.onClick({
      from,
      index,
      block: props.block,
      selectedCodeWindow: props.selectedCodeWindow
    });
  }

  const getNameIndex = evt => {
    let el = evt.currentTarget;
    return {
      name: el.getAttribute('data-name'),
      index: el.getAttribute('data-index'),
      block: el.getAttribute('data-block')
    }
  }

  const onDragStart = evt => {
    props.dragStart(getNameIndex(evt));
  }

  const onDragEnd = evt => {
    props.dragEnd();
    evt.preventDefault();
  }

  const onDragEnter = evt => {
    props.dragEnter(getNameIndex(evt));
    evt.preventDefault();
  }

  const onDragExit = evt => {
    props.dragExit(getNameIndex(evt));
    evt.preventDefault();
  }

  const onDragLeave = evt => {
    props.dragLeave(getNameIndex(evt));
    evt.preventDefault();
  }

  const onDragOver = evt => {
    props.dragOver(getNameIndex(evt));
    evt.preventDefault();
  }

  const onDrop = evt => {
    props.drop(props.draggable);
    evt.preventDefault();
  }

  useEffect(() => {
    let _className = ['code-block'];
    if (props.block === 'forward')  _className.push('forward');
    if (props.block === 'right')    _className.push('right');
    if (props.block === 'left')     _className.push('left');
    if (props.block === 'blue')     _className.push('blue-on');
    if (props.block === 'yellow')   _className.push('yellow-on');
    if (props.block === 'p1')       _className.push('p1');
    if (props.block === 'p2')       _className.push('p2');
    if (props.block === 'l1')       _className.push('l1');
    if (props.block === 'l2')       _className.push('l2');
    if (props.active) {
      _className.push('active');
    } else if (props.gameState === 'RUNNING') {
      _className.push('inactive');
    }
    setClassName(_className);
  }, [props.block, props.active, props.gameState]);

  return (
    <div id={props.name+props.index}
         className={className.join(' ')}
         data-index={props.index}
         data-name={props.name}
         data-block={props.block}
         draggable={true}
         onDragStart={onDragStart}
         onDrop={onDrop}
         onDragOver={props.index <= props.length ? onDragOver : null}
         onDragEnd={onDragEnd}
         onDragEnter={onDragEnter}
         onDragLeave={onDragLeave}
         onDragExit={onDragExit}
         onClick={onClick} />
  );
}

const actionCreators = {dragStart, dragOver, dragEnter, dragLeave, dragExit, dragEnd, drop}

export default connect(
  mapStateToProps,
  actionCreators
)(CodeBlock);
