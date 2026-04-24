import { useState, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ImagePanel from './components/ImagePanel'
import CoordinatesPanel from './components/CoordinatesPanel'
import { DEFAULT_DEVICE, DEFAULT_BRAND, DEVICES_BY_BRAND } from './constants/deviceConfig'
import { useToast } from '../../components/Toast/ToastContainer'
import './CoordinateExtractor.css'

function CoordinateExtractor() {
  const toast = useToast()
  const [image, setImage] = useState(null)
  const [coordinates, setCoordinates] = useState([])
  const [isCropping, setIsCropping] = useState(false)
  const [currentDevice, setCurrentDevice] = useState(DEFAULT_DEVICE)
  const [isGestureMode, setIsGestureMode] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState(DEFAULT_BRAND)
  const [isCustomMode, setIsCustomMode] = useState(false)
  const [customWidth, setCustomWidth] = useState('')
  const [customHeight, setCustomHeight] = useState('')
  const imageRef = useRef(null)

  // Handle brand change
  const handleBrandChange = (newBrand) => {
    setSelectedBrand(newBrand)
    setIsCustomMode(false) // Reset custom mode when changing brand
    // Set first device of the new brand as current
    const devicesOfBrand = DEVICES_BY_BRAND[newBrand]
    const firstDevice = Object.values(devicesOfBrand)[0]
    if (firstDevice) {
      setCurrentDevice(firstDevice)
    }
  }

  // Handle custom mode toggle
  const handleCustomModeToggle = () => {
    setIsCustomMode(!isCustomMode)
    if (!isCustomMode) {
      // Initialize with current device values when enabling custom mode
      setCustomWidth(currentDevice.width.toString())
      setCustomHeight(currentDevice.height.toString())
    }
  }

  // Get effective device (custom or selected)
  const getEffectiveDevice = () => {
    if (isCustomMode && customWidth && customHeight) {
      return {
        id: 'CUSTOM',
        name: 'Custom Device',
        width: parseInt(customWidth) || 1,
        height: parseInt(customHeight) || 1,
        scaleFactor: 1, // For custom, we use 1:1 ratio
        description: `Custom (${customWidth}×${customHeight})`,
        brand: 'custom',
        isCustom: true
      }
    }
    return currentDevice
  }

  const effectiveDevice = getEffectiveDevice()

  const handleImageLoad = (imageData) => {
    setImage(imageData)
    // Limpiar coordenadas siempre que se carga una nueva imagen o se borra
    setCoordinates([])
  }

  const handleCoordinateCapture = (coord) => {
    const device = getEffectiveDevice()
    const logicalX = Math.round((coord.originalX / coord.imageNaturalWidth) * device.width)
    const logicalY = Math.round((coord.originalY / coord.imageNaturalHeight) * device.height)
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
      .then(() => toast.success('¡Coordenadas copiadas al portapapeles!'))
      .catch(() => toast.error('Error al copiar las coordenadas'))
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
            currentDevice={effectiveDevice}
            setCurrentDevice={setCurrentDevice}
            isGestureMode={isGestureMode}
            setIsGestureMode={setIsGestureMode}
            imageRef={imageRef}
            selectedBrand={selectedBrand}
            onBrandChange={handleBrandChange}
            customWidth={customWidth}
            customHeight={customHeight}
            onCustomWidthChange={setCustomWidth}
            onCustomHeightChange={setCustomHeight}
            isCustomMode={isCustomMode}
            onCustomModeToggle={handleCustomModeToggle}
          />
        </Col>
        <Col lg={3} md={4} className="coordinates-panel-col">
          <CoordinatesPanel
            coordinates={coordinates}
            onClear={handleClearCoordinates}
            onCopyAll={handleCopyAll}
            image={image}
            imageRef={imageRef}
            currentDevice={effectiveDevice}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default CoordinateExtractor
