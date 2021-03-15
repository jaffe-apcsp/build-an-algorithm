import 'aframe';
import React from 'react';
import atmosphere from './assets/atmosphere.jpg';

const Environment = props => {

  return (
    <>
      <a-sky src={atmosphere} rotation="0 0 0" />
      <a-light type="ambient" color="#666" position="0 0 0" rotation="0 0 0" scale="1 1 1" visible="true" light="type:ambient;color:#666" />
      <a-light type="point" intensity="" position="2.5 7.5 10" rotation="0 0 0" scale="1 1 1" visible="true" light="type:point;intensity:1" />
    </>
  );
};


export default Environment;
