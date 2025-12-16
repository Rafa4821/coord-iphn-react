import { useState, useRef } from 'react'
import { Cropper } from 'react-cropper'
import Toolbar from './Toolbar'
import ImageContainer from './ImageContainer'
import StatusBar from './StatusBar'
import GestureSimulator from './GestureSimulator'
import './ImagePanel.css'

function ImagePanel({ 
  image, 
  onImageLoad, 
  onCoordinateCapture, 
  onGestureCapture,
  isCropping, 
  setIsCropping, 
  currentDevice,
  setCurrentDevice,
  isGestureMode,
  setIsGestureMode,
  imageRef 
}) {
  const [liveCoords, setLiveCoords] = useState({ x: '--', y: '--' })
  const [croppedImage, setCroppedImage] = useState(null)
  const cropperRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      onImageLoad(event.target.result)
      setCroppedImage(null)
      setIsCropping(false)
      setIsGestureMode(false)
    }
    reader.readAsDataURL(file)
  }

  const handleStartCrop = () => {
    setIsCropping(true)
    setIsGestureMode(false)
  }

  const handleConfirmCrop = () => {
    const cropper = cropperRef.current?.cropper
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas()
      if (croppedCanvas) {
        const croppedDataUrl = croppedCanvas.toDataURL()
        setCroppedImage(croppedDataUrl)
        onImageLoad(croppedDataUrl)
      }
    }
    setIsCropping(false)
  }

  const handleCancelCrop = () => {
    setIsCropping(false)
  }

  const handleGestureToggle = () => {
    setIsGestureMode(!isGestureMode)
  }

  const handleGestureClose = () => {
    setIsGestureMode(false)
  }

  const gestureSimulatorRef = useRef(null)

  return (
    <div className="image-panel">
      <Toolbar
        onImageUpload={handleImageUpload}
        onStartCrop={handleStartCrop}
        onConfirmCrop={handleConfirmCrop}
        onCancelCrop={handleCancelCrop}
        isCropping={isCropping}
        hasImage={!!image}
        currentDevice={currentDevice}
        onDeviceChange={setCurrentDevice}
        onGestureToggle={handleGestureToggle}
        isGestureMode={isGestureMode}
      />
      
      <ImageContainer
        image={croppedImage || image}
        onCoordinateCapture={onCoordinateCapture}
        setLiveCoords={setLiveCoords}
        isCropping={isCropping}
        isGestureMode={isGestureMode}
        cropperRef={cropperRef}
        imageRef={imageRef}
        currentDevice={currentDevice}
        gestureSimulatorRef={gestureSimulatorRef}
      />
      
      {isGestureMode && (
        <GestureSimulator
          ref={gestureSimulatorRef}
          isActive={isGestureMode}
          onClose={handleGestureClose}
          onGestureCapture={onGestureCapture}
          imageRef={imageRef}
          currentDevice={currentDevice}
        />
      )}
      
      <StatusBar coords={liveCoords} />
    </div>
  )
}

export default ImagePanel
