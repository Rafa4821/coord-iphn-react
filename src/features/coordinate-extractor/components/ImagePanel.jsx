import { useState, useRef, useEffect } from 'react'
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
  imageRef,
  selectedBrand,
  onBrandChange,
  customWidth,
  customHeight,
  onCustomWidthChange,
  onCustomHeightChange,
  isCustomMode,
  onCustomModeToggle
}) {
  const [liveCoords, setLiveCoords] = useState({ x: '--', y: '--' })
  const [croppedImage, setCroppedImage] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const cropperRef = useRef(null)
  const imagePanelRef = useRef(null)

  const loadImageFromFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = (event) => {
      onImageLoad(event.target.result)
      setCroppedImage(null)
      setIsCropping(false)
      setIsGestureMode(false)
    }
    reader.readAsDataURL(file)
  }

  const handleClearImage = () => {
    onImageLoad(null)
    setCroppedImage(null)
    setIsCropping(false)
    setIsGestureMode(false)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    loadImageFromFile(file)
  }

  // Paste from clipboard
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items
      if (!items) return

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile()
          loadImageFromFile(file)
          e.preventDefault()
          break
        }
      }
    }

    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [onImageLoad])

  // Drag and drop handlers
  const handleDragEnter = (e) => {
    // Desactivar drag & drop durante modo gestos o cropping
    if (isGestureMode || isCropping) {
      e.preventDefault()
      return
    }
    
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    if (isGestureMode || isCropping) return
    
    e.preventDefault()
    e.stopPropagation()
    if (e.target === imagePanelRef.current) {
      setIsDragging(false)
    }
  }

  const handleDragOver = (e) => {
    // Desactivar drag & drop durante modo gestos o cropping
    if (isGestureMode || isCropping) {
      e.preventDefault()
      return
    }
    
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    // Bloquear drop durante modo gestos o cropping
    if (isGestureMode || isCropping) {
      e.preventDefault()
      return
    }
    
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer?.files
    if (files && files.length > 0) {
      loadImageFromFile(files[0])
    }
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
    <div 
      ref={imagePanelRef}
      className={`image-panel ${isDragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
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
        selectedBrand={selectedBrand}
        onBrandChange={onBrandChange}
        customWidth={customWidth}
        customHeight={customHeight}
        onCustomWidthChange={onCustomWidthChange}
        onCustomHeightChange={onCustomHeightChange}
        isCustomMode={isCustomMode}
        onCustomModeToggle={onCustomModeToggle}
        onClearImage={handleClearImage}
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
      
      {isDragging && (
        <div className="drag-overlay">
          <div className="drag-overlay-content">
            <div className="drag-icon">📁</div>
            <p className="drag-text">Suelta la imagen aquí</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImagePanel
