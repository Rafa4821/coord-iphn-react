import './StatusBar.css'

function StatusBar({ coords }) {
  return (
    <div className="status-bar">
      <span className="coords-display">
        Lógico → X: <strong>{coords.x}</strong>, Y: <strong>{coords.y}</strong>
      </span>
    </div>
  )
}

export default StatusBar
