'use client'

import type { WheelEvent } from "react";
import { useState } from 'react';

export default function Square() {
  return (
    <div>
      <button className="square">X</button>
      <Knob />
    </div>
  );
}

function Knob() {

  const [rotation, setRotation] = useState(0);
  const [transform, setTransform] = useState(
    `rotateZ(${rotation}) scale(50%, 10%) translate(50%)`);

  function moveDial(event: WheelEvent) {
    // console.log(`ScrollWheel ${event.deltaX} ${event.deltaY} ${event.deltaZ}`);
    let newRotation = Math.abs((rotation + (event.deltaY-115)) % 360)
    setRotation(newRotation);
    console.log(newRotation);
    // setTransform(`rotateZ(${newRotation}) scale(50%, 10%) translate(50%)`);
    // console.log(`Transform: ${transform}`)
  }

  return (
    <span className="knob-outer">
      <span
        className="knob-inner"
        onWheel={moveDial}>
        <span
          style={{ transform:  `rotateZ(${rotation}deg) scale(50%, 10%) translate(50%)`}}
          // onMouseDown={moveDial}
          className="dial">
        </span>
      </span>
    </span>
  )
}
