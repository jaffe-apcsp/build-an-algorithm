import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CELL_ON_PATH, BLUE_OFF, BLUE_ON, RED_ON, RED_OFF,
  FORWARD, RIGHT, LEFT, FINISH, P1, P2, L1, L2} from '../utilities/constants';

const mapStateToProps = (state, ownProps) => {
  return {
    cell: ownProps.cell,
    isBug: ownProps.isBug,
    rowIdx: ownProps.rowIdx,
    colIdx: ownProps.colIdx,
    row: state.currentRow,
    col: state.currentCol,
    direction: state.direction
  }
}

const Cell = props => {

  const [className, setClassName] = useState([]);
  const [blockInactive, setBlockInactive] = useState(false);

  const checkCode = (checkCell, against) => {
    return checkCell.indexOf(against) >= 0
  }

  useEffect(() => {
    let isBug = (props.row === props.rowIdx) && (props.col === props.colIdx);
    let _className = ['code-block'];
    if (isBug) {
      _className.push('bug');
      _className.push(props.direction);
    }
    if (checkCode(props.cell, CELL_ON_PATH))  _className.push('cell-on-path');
    if (checkCode(props.cell, FORWARD))       _className.push('forward');
    if (checkCode(props.cell, RIGHT))         _className.push('right');
    if (checkCode(props.cell, LEFT))          _className.push('left');
    if (checkCode(props.cell, FINISH))        _className.push('blue-off');
    if (checkCode(props.cell, P1))            _className.push('p1');
    if (checkCode(props.cell, P2))            _className.push('p2');
    if (checkCode(props.cell, L1))            _className.push('l1');
    if (checkCode(props.cell, L2))            _className.push('l2');
    if (checkCode(props.cell, BLUE_OFF))      _className.push('blue-off');
    if (checkCode(props.cell, BLUE_ON))       _className.push('blue-on');
    if (checkCode(props.cell, RED_OFF))    _className.push('yellow-off');
    if (checkCode(props.cell, RED_ON))     _className.push('yellow-on');
    setBlockInactive(_className.length <= 1)
    setClassName(_className.join(' '));
  }, [props.cell, props.active, props.col, props.row, props.colIdx, props.rowIdx, props.direction])

  return (
    <td className={blockInactive ? 'code-block-inactive' : ''}>
      <div className={className} />
    </td>
  );
}

// const actionCreators = {};

export default connect(
  mapStateToProps
)(Cell);
