import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button, ButtonGroup, Form, InputGroup, Badge } from 'react-bootstrap'
import { Hand, Zap, X } from 'lucide-react'
import './GestureSimulator.css'

const GestureSimulator = forwardRef(({ 
  isActive, 
  onClose, 
  onGestureCapture, 
  imageRef,
  currentDevice 
}, ref) => {
  const [gestureType, setGestureType] = useState('swipe')
  const [startPoint, setStartPoint] = useState(null)
  const [endPoint, setEndPoint] = useState(null)
  const [duration, setDuration] = useState(500)
  const [isCapturingStart, setIsCapturingStart] = useState(false)
  const [isCapturingEnd, setIsCapturingEnd] = useState(false)

  const handleImageClick = (e) => {
    if (!imageRef.current) return

    e.stopPropagation()
    
    const rect = imageRef.current.getBoundingClientRect()
    const clickX = e.clientX
    const clickY = e.clientY
    
    if (clickX < rect.left || clickX > rect.right || clickY < rect.top || clickY > rect.bottom) {
      return
    }

    const imageX = clickX - rect.left
    const imageY = clickY - rect.top

    const ratio = imageRef.current.naturalWidth / imageRef.current.clientWidth
    const originalX = imageX * ratio
    const originalY = imageY * ratio

    const imgElement = imageRef.current
    const logicalX = Math.round((originalX / imgElement.naturalWidth) * currentDevice.width)
    const logicalY = Math.round((originalY / imgElement.naturalHeight) * currentDevice.height)

    if (isCapturingStart) {
      setStartPoint({ 
        x: logicalX, 
        y: logicalY, 
        displayX: clickX,
        displayY: clickY
      })
      setIsCapturingStart(false)
      setIsCapturingEnd(true)
    } else if (isCapturingEnd) {
      setEndPoint({ 
        x: logicalX, 
        y: logicalY, 
        displayX: clickX,
        displayY: clickY
      })
      setIsCapturingEnd(false)
    }
  }

  const handleStartCapture = () => {
    setStartPoint(null)
    setEndPoint(null)
    setIsCapturingStart(true)
    setIsCapturingEnd(false)
  }

  const handleGenerate = () => {
    if (!startPoint || !endPoint) {
      alert('Por favor captura ambos puntos (inicio y final)')
      return
    }

    const gestureCode = gestureType === 'swipe'
      ? `driver.swipe(${startPoint.x}, ${startPoint.y}, ${endPoint.x}, ${endPoint.y}, ${duration})`
      : `driver.flick(${startPoint.x}, ${startPoint.y}, ${endPoint.x}, ${endPoint.y})`

    onGestureCapture({
      type: gestureType,
      start: startPoint,
      end: endPoint,
      duration: gestureType === 'swipe' ? duration : null,
      code: gestureCode
    })

    setStartPoint(null)
    setEndPoint(null)
  }

  const handleReset = () => {
    setStartPoint(null)
    setEndPoint(null)
    setIsCapturingStart(false)
    setIsCapturingEnd(false)
  }

  useImperativeHandle(ref, () => ({
    handleImageClick
  }))

  if (!isActive) return null

  return (
    <>
      {startPoint && (
        <div 
          className="gesture-point start-point"
          style={{
            left: `${startPoint.displayX}px`,
            top: `${startPoint.displayY}px`
          }}
        >
          <span className="point-label">Inicio</span>
        </div>
      )}
      
      {endPoint && (
        <>
          <div 
            className="gesture-point end-point"
            style={{
              left: `${endPoint.displayX}px`,
              top: `${endPoint.displayY}px`
            }}
          >
            <span className="point-label">Final</span>
          </div>
          <svg className="gesture-arrow">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#0d6efd" />
              </marker>
            </defs>
            <line
              x1={startPoint.displayX}
              y1={startPoint.displayY}
              x2={endPoint.displayX}
              y2={endPoint.displayY}
              stroke="#0d6efd"
              strokeWidth="3"
              markerEnd="url(#arrowhead)"
            />
          </svg>
        </>
      )}

      {(isCapturingStart || isCapturingEnd) && (
        <div className="capture-instruction">
          {isCapturingStart && '📍 Haz clic en el punto de INICIO'}
          {isCapturingEnd && '📍 Haz clic en el punto FINAL'}
        </div>
      )}

      <div className="gesture-panel">
        <div className="gesture-header">
          <h6 className="mb-0">
            {gestureType === 'swipe' ? <Hand size={18} /> : <Zap size={18} />}
            <span className="ms-2">Simulador de Gestos</span>
          </h6>
          <Button variant="link" size="sm" onClick={onClose} className="text-danger">
            <X size={18} />
          </Button>
        </div>

        <div className="gesture-controls">
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Gesto</Form.Label>
            <ButtonGroup className="w-100">
              <Button
                variant={gestureType === 'swipe' ? 'primary' : 'outline-primary'}
                onClick={() => setGestureType('swipe')}
              >
                <Hand size={16} className="me-2" />
                Swipe
              </Button>
              <Button
                variant={gestureType === 'flick' ? 'primary' : 'outline-primary'}
                onClick={() => setGestureType('flick')}
              >
                <Zap size={16} className="me-2" />
                Flick
              </Button>
            </ButtonGroup>
          </Form.Group>

          {gestureType === 'swipe' && (
            <Form.Group className="mb-3">
              <Form.Label>Duración (ms)</Form.Label>
              <Form.Control
                type="number"
                value={duration}
                onChange={(e) => {
                  const val = e.target.value
                  if (val === '') {
                    setDuration('')
                  } else {
                    const num = parseInt(val)
                    if (!isNaN(num)) {
                      setDuration(num)
                    }
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === '' || parseInt(e.target.value) < 100) {
                    setDuration(500)
                  }
                }}
                min="100"
                max="5000"
                step="100"
              />
            </Form.Group>
          )}

          <div className="gesture-points mb-3">
            <div className="point-info">
              <Badge bg={startPoint ? 'success' : 'secondary'}>
                Inicio: {startPoint ? `(${startPoint.x}, ${startPoint.y})` : 'No capturado'}
              </Badge>
            </div>
            <div className="point-info">
              <Badge bg={endPoint ? 'success' : 'secondary'}>
                Final: {endPoint ? `(${endPoint.x}, ${endPoint.y})` : 'No capturado'}
              </Badge>
            </div>
          </div>

          <div className="d-grid gap-2">
            <Button 
              variant="info" 
              onClick={handleStartCapture}
            >
              {!startPoint ? 'Capturar Puntos' : 'Recapturar'}
            </Button>
            <Button 
              variant="success" 
              onClick={handleGenerate}
              disabled={!startPoint || !endPoint}
            >
              Generar Código
            </Button>
            <Button 
              variant="outline-secondary" 
              onClick={handleReset}
              size="sm"
            >
              Limpiar
            </Button>
          </div>
        </div>
      </div>
    </>
  )
})

GestureSimulator.displayName = 'GestureSimulator'

export default GestureSimulator
