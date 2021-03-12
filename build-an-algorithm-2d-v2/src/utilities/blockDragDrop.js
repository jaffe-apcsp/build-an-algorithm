const blockDragDrop = (name, blocks, draggable) => {
  let { srcName, srcIndex, srcBlock, destName, destIndex } = draggable;
  if (srcName === 'palette') {
    if (destName === name) {
      // From the palette
      blocks.splice(destIndex, 0, srcBlock);
    }
  } else if (name === srcName && name === destName) {
    // From within the same code window
    blocks.splice(destIndex, 0, blocks.splice(srcIndex, 1)[0]);
  } else if (name === destName) {
    blocks.splice(destIndex, 0, srcBlock);
  } else if (name === srcName) {
    blocks.splice(srcIndex, 1);
  }
  return blocks
}

export default blockDragDrop;
