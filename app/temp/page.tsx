
export default function Square() {
  return (
    <div>
      <button className="square">X</button>
      <Knob />
    </div>
  );
}

function Knob() {
  return (
    <span className="knob-outer">
      <span className="knob-inner">
        <span className="dial">
        </span>
      </span>
    </span>
  )
}
