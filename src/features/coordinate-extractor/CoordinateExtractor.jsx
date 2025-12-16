import { useState, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ImagePanel from './components/ImagePanel'
import CoordinatesPanel from './components/CoordinatesPanel'
import { DEFAULT_DEVICE } from './constants/deviceConfig'
import './CoordinateExtractor.css'

function CoordinateExtractor() {
  const [image, setImage] = useState(null)
  const [coordinates, setCoordinates] = useState([])
  const [isCropping, setIsCropping] = useState(false)
  const [currentDevice, setCurrentDevice] = useState(DEFAULT_DEVICE)
  const [isGestureMode, setIsGestureMode] = useState(false)
  const imageRef = useRef(null)

  const handleImageLoad = (imageData) => {
    setImage(imageData)
    setCoordinates([])
  }

  const handleCoordinateCapture = (coord) => {
    const logicalX = Math.round(coord.originalX / currentDevice.scaleFactor)
    const logicalY = Math.round(coord.originalY / currentDevice.scaleFactor)
    const coordText = `clickPantalla = driver.tap([(${logicalX}, ${logicalY})], 100)`
    
    setCoordinates(prev => [...prev, {
      id: Date.now(),
      x: logicalX,
      y: logicalY,
      text: coordText,
      type: 'tap'
    }])
  }

  const handleGestureCapture = (gesture) => {
    setCoordinates(prev => [...prev, {
      id: Date.now(),
      text: gesture.code,
      type: gesture.type,
      start: gesture.start,
      end: gesture.end,
      duration: gesture.duration
    }])
  }

  const handleClearCoordinates = () => {
    setCoordinates([])
  }

  const handleCopyAll = () => {
    const allText = coordinates.map(c => c.text).join('\n')
    navigator.clipboard.writeText(allText)
      .then(() => alert('¡Coordenadas copiadas al portapapeles!'))
      .catch(() => alert('Error al copiar las coordenadas'))
  }

  return (
    <Container fluid className="coordinate-extractor">
      <Row className="h-100 g-0">
        <Col lg={9} md={8} className="image-panel-col">
          <ImagePanel
            image={image}
            onImageLoad={handleImageLoad}
            onCoordinateCapture={handleCoordinateCapture}
            onGestureCapture={handleGestureCapture}
            isCropping={isCropping}
            setIsCropping={setIsCropping}
            currentDevice={currentDevice}
            setCurrentDevice={setCurrentDevice}
            isGestureMode={isGestureMode}
            setIsGestureMode={setIsGestureMode}
            imageRef={imageRef}
          />
        </Col>
        <Col lg={3} md={4} className="coordinates-panel-col">
          <CoordinatesPanel
            coordinates={coordinates}
            onClear={handleClearCoordinates}
            onCopyAll={handleCopyAll}
            image={image}
            imageRef={imageRef}
            currentDevice={currentDevice}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default CoordinateExtractor
