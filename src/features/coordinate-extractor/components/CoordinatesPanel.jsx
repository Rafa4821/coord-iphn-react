import { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Trash2, Copy, Target } from 'lucide-react'
import CoordinateList from './CoordinateList'
import './CoordinatesPanel.css'

function CoordinatesPanel({ coordinates, onClear, onCopyAll, image, imageRef, currentDevice }) {
  const [testX, setTestX] = useState('')
  const [testY, setTestY] = useState('')

  const handleTestCoordinate = () => {
    const x = parseInt(testX, 10)
    const y = parseInt(testY, 10)

    if (isNaN(x) || isNaN(y) || !image || !imageRef.current) {
      alert('Por favor ingresa coordenadas válidas y asegúrate de tener una imagen cargada')
      return
    }

    const imgElement = imageRef.current
    const rect = imgElement.getBoundingClientRect()
    
    // Proceso inverso exacto de captura:
    // Captura: (originalX / naturalWidth) * deviceWidth = logicalX
    // Prueba: (logicalX / deviceWidth) * naturalWidth = originalX
    
    // 1. Lógicas → Originales (coordenadas en imagen original)
    const originalX = (x / currentDevice.width) * imgElement.naturalWidth
    const originalY = (y / currentDevice.height) * imgElement.naturalHeight
    
    // 2. Originales → Display (coordenadas en imagen mostrada)
    const scaleRatio = imgElement.clientWidth / imgElement.naturalWidth
    const imageX = originalX * scaleRatio
    const imageY = originalY * scaleRatio
    
    // 3. Display → Viewport (coordenadas absolutas en pantalla)
    const viewportX = rect.left + imageX
    const viewportY = rect.top + imageY

    showTestMarker(viewportX, viewportY)
  }

  const showTestMarker = (x, y) => {
    const marker = document.createElement('div')
    marker.className = 'test-marker'
    marker.style.position = 'fixed'
    marker.style.left = `${x}px`
    marker.style.top = `${y}px`
    marker.style.width = '14px'
    marker.style.height = '14px'
    marker.style.borderRadius = '50%'
    marker.style.backgroundColor = 'rgba(255, 255, 0, 0.9)'
    marker.style.border = '3px solid #000'
    marker.style.transform = 'translate(-50%, -50%)'
    marker.style.pointerEvents = 'none'
    marker.style.zIndex = '9999'
    marker.style.boxShadow = '0 0 15px rgba(255, 255, 0, 0.8), 0 0 30px rgba(255, 255, 0, 0.4)'
    marker.style.animation = 'testMarkerPulse 1s ease-in-out infinite'

    const style = document.createElement('style')
    style.textContent = `
      @keyframes testMarkerPulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.2); }
      }
    `
    document.head.appendChild(style)

    document.body.appendChild(marker)

    setTimeout(() => {
      marker.remove()
      style.remove()
    }, 3000)
  }

  return (
    <div className="coordinates-panel">
      <div className="panel-header">
        <h5 className="mb-0">Coordenadas Generadas</h5>
      </div>

      <CoordinateList coordinates={coordinates} />

      <div className="actions-section">
        <div className="d-grid gap-2">
          <Button 
            variant="danger" 
            onClick={onClear}
            disabled={coordinates.length === 0}
          >
            <Trash2 size={18} className="me-2" />
            Limpiar Todo
          </Button>
          <Button 
            variant="primary" 
            onClick={onCopyAll}
            disabled={coordinates.length === 0}
          >
            <Copy size={18} className="me-2" />
            Copiar Todo
          </Button>
        </div>
      </div>

      <div className="test-section">
        <h6 className="mb-3">Probar Coordenada</h6>
        <Form onSubmit={(e) => { e.preventDefault(); handleTestCoordinate(); }}>
          <InputGroup className="mb-2">
            <InputGroup.Text>X</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="Coordenada X"
              value={testX}
              onChange={(e) => setTestX(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Y</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="Coordenada Y"
              value={testY}
              onChange={(e) => setTestY(e.target.value)}
            />
          </InputGroup>
          <Button 
            variant="info" 
            type="submit" 
            className="w-100"
            disabled={!image}
          >
            <Target size={18} className="me-2" />
            Probar Coordenada
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default CoordinatesPanel
