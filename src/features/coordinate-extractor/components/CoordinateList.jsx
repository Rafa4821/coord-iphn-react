import { ListGroup } from 'react-bootstrap'
import { Copy } from 'lucide-react'
import './CoordinateList.css'

function CoordinateList({ coordinates }) {
  const handleCopyIndividual = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        const notification = document.createElement('div')
        notification.className = 'copy-notification'
        notification.textContent = '¡Copiado!'
        document.body.appendChild(notification)
        
        setTimeout(() => {
          notification.classList.add('fade-out')
          setTimeout(() => notification.remove(), 300)
        }, 1500)
      })
      .catch(() => alert('Error al copiar'))
  }

  return (
    <div className="coordinate-list-container">
      {coordinates.length === 0 ? (
        <div className="empty-state">
          <p className="text-muted text-center">
            Haz clic en la imagen para capturar coordenadas
          </p>
        </div>
      ) : (
        <ListGroup variant="flush" className="coordinate-list">
          {coordinates.map((coord) => (
            <ListGroup.Item
              key={coord.id}
              className="coordinate-item"
              onClick={() => handleCopyIndividual(coord.text)}
            >
              <div className="coordinate-text">
                <code>{coord.text}</code>
              </div>
              <Copy size={16} className="copy-icon" />
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  )
}

export default CoordinateList
