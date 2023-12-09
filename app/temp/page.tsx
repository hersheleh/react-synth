
export default function Square() {
  return (
    <div>
      <button className="square">X</button>
      <div className="knob"></div>
    </div>
  );
}

function Knob() {
  return <input type="range" />
}
