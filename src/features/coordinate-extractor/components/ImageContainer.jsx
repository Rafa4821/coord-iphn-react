import { useRef, useEffect, useState } from 'react'
import { Cropper } from 'react-cropper'
import './ImageContainer.css'

function ImageContainer({ 
  image, 
  onCoordinateCapture, 
  setLiveCoords, 
  isCropping, 
  isGestureMode,
  cropperRef, 
  imageRef,
  currentDevice,
  gestureSimulatorRef
}) {
  const containerRef = useRef(null)
  const [markers, setMarkers] = useState([])

  const getOriginalCoordsFromEvent = (e, imgElement) => {
    if (!imgElement) return null

    const rect = imgElement.getBoundingClientRect()
    const imageX = e.clientX - rect.left
    const imageY = e.clientY - rect.top

    const ratio = imgElement.naturalWidth / imgElement.clientWidth
    const originalX = imageX * ratio
    const originalY = imageY * ratio

    return { originalX, originalY }
  }

  const handleImageClick = (e) => {
    if (isCropping || !imageRef.current) return

    if (isGestureMode && gestureSimulatorRef?.current?.handleImageClick) {
      gestureSimulatorRef.current.handleImageClick(e)
      return
    }

    const coords = getOriginalCoordsFromEvent(e, imageRef.current)
    if (!coords) return

    onCoordinateCapture(coords)
  }

  const handleMouseMove = (e) => {
    if (isCropping || isGestureMode || !imageRef.current) return

    const coords = getOriginalCoordsFromEvent(e, imageRef.current)
    if (!coords) {
      setLiveCoords({ x: '--', y: '--' })
      return
    }

    const logicalX = Math.round(coords.originalX / currentDevice.scaleFactor)
    const logicalY = Math.round(coords.originalY / currentDevice.scaleFactor)
    setLiveCoords({ x: logicalX, y: logicalY })
  }

  const handleMouseLeave = () => {
    setLiveCoords({ x: '--', y: '--' })
  }

  const showMarker = (x, y) => {
    const newMarker = {
      id: Date.now(),
      x,
      y
    }
    setMarkers(prev => [...prev, newMarker])

    setTimeout(() => {
      setMarkers(prev => prev.filter(m => m.id !== newMarker.id))
    }, 2000)
  }

  useEffect(() => {
    if (image && imageRef.current && !isCropping && !isGestureMode) {
      const handleClick = (e) => {
        // Usar coordenadas absolutas del viewport
        const x = e.clientX
        const y = e.clientY
        showMarker(x, y)
      }
      
      const imgElement = imageRef.current
      imgElement.addEventListener('click', handleClick)
      
      return () => {
        imgElement.removeEventListener('click', handleClick)
      }
    }
  }, [image, isCropping, isGestureMode])

  return (
    <div className="image-container" ref={containerRef}>
      {!image && (
        <div className="placeholder-text">
          <p className="text-muted fs-5">Carga una imagen para empezar</p>
        </div>
      )}

      {image && !isCropping && (
        <div className="image-wrapper">
          <img
            ref={imageRef}
            src={image}
            alt="Loaded"
            className="loaded-image"
            onClick={handleImageClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
          {markers.map(marker => (
            <div
              key={marker.id}
              className="coordinate-marker"
              style={{
                left: `${marker.x}px`,
                top: `${marker.y}px`
              }}
            />
          ))}
        </div>
      )}

      {image && isCropping && (
        <Cropper
          ref={cropperRef}
          src={image}
          style={{ height: '100%', width: '100%' }}
          background={false}
          autoCrop={false}
          viewMode={1}
          guides={true}
          responsive={true}
        />
      )}
    </div>
  )
}

export default ImageContainer
