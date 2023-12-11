import type { WheelEvent, MouseEvent, ChangeEvent } from "react";
import { useState, useRef } from 'react';


function Knob() {

  const [rotation, setRotation] = useState(0);
  let [mouseDown, setMouseDown] = useState(false);
  const [mousePosition, setMousePosition] = useState([0,0]);
  const knobElement = useRef<HTMLSpanElement>(null);

  function scrollWheelRotate(event: WheelEvent) {
    let newRotation = (rotation + (event.deltaY/12) % 360)
    setRotation(newRotation);
  }

  function mouseDownTrue(event: MouseEvent) {
    setMouseDown(true);
    mouseDown = true;
    clickRotate(event);
  }

  function mouseDownFalse(event: MouseEvent) {
    setMouseDown(false);
  }

  // function printMouse(event: MouseEvent) {
  //   setMousePosition([event.clientX, event.clientY]);
  // }

  function clickRotate(event: MouseEvent) {
    if (mouseDown) {
      if (knobElement.current) {
        const knobRect = knobElement.current.getBoundingClientRect();
        const centerX = (knobRect.right + knobRect.left) / 2;
        const centerY = (knobRect.bottom + knobRect.top) / 2;
        // Unit Circle
        let length = knobRect.right - centerX;
        let y = (event.clientY - centerY) / length;
        let x = (event.clientX - centerX) / length;
        const radToDeg = (180 / Math.PI);
        const thetaRad = Math.atan2(y, x);
        const thetaDeg = thetaRad * radToDeg;
        const newRotation = thetaDeg;
        // console.log(`x ${x}\ny ${y}\ny/x ${y / x}\ndeg ${thetaDeg}\nrad ${thetaRad}\nacos(x) ${Math.acos(x) * radToDeg}\nasin(y) ${Math.asin(y) * radToDeg}`);
        setRotation(newRotation);
    }
    }
  }
  function rotateDial(event: ChangeEvent) {
    const target = event.target as HTMLInputElement;
    setRotation(parseInt(target.value));
  }


  return (
    <div>
      <div>
        Mouse Position: ({mousePosition[0]} {mousePosition[1]})
      </div>
      <span
        className="knob-outer"
        onMouseLeave={mouseDownFalse}
      >
        <span
          className="knob-inner"
          onWheel={scrollWheelRotate}
          ref={knobElement}
          onMouseMove={clickRotate}
          onMouseDown={mouseDownTrue}
          onMouseUp={mouseDownFalse}>
          <span
            className="dial"
            style={{
              transform: `rotateZ(${rotation
                }deg) scale(50%, 10%) translate(50%)`
            }}>
          </span>
        </span>
      </span>
      {rotation}
      <input
        className="rotSlider"
        type="range"
        min="-180"
        max="180"
        value={rotation}
        onChange={rotateDial} />
    </div>
  )
}
