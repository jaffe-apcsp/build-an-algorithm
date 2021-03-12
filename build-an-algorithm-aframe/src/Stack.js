AFRAME.Stack = () => {

  let arr = [];

  return {
    push: item => arr.push(item),
    pop: () => arr.pop(),
    peek: () => arr.length === 0 ? null : arr[arr.length-1],
    isEmpty: () => arr.length === 0,
    clear: () => arr = [],
    toArray: () => arr,
    nextInstruction: () => {
      let rec = arr[arr.length-1];
      if (rec) rec.index++;
    },
    isInstructionActive: (procIdx, index) => {
      return arr.reduce((acc, inst) => acc || (inst.procIdx === procIdx && inst.index === index), false);
    }
  }
};
