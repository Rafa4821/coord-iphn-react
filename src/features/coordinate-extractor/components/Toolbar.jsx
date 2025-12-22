import { useState } from 'react'
import { Button, ButtonGroup, Form } from 'react-bootstrap'
import { Upload, Crop, Check, X, Moon, Sun, Hand, Trash2 } from 'lucide-react'
import { useTheme } from '../../../context/ThemeContext'
import { DEVICE_CONFIGS, BRANDS, DEVICES_BY_BRAND } from '../constants/deviceConfig'
import BrandSelector from './BrandSelector'
import './Toolbar.css'

function Toolbar({ 
  onImageUpload, 
  onStartCrop, 
  onConfirmCrop, 
  onCancelCrop, 
  isCropping, 
  hasImage,
  currentDevice,
  onDeviceChange,
  onGestureToggle,
  isGestureMode,
  selectedBrand,
  onBrandChange,
  customWidth,
  customHeight,
  onCustomWidthChange,
  onCustomHeightChange,
  isCustomMode,
  onCustomModeToggle,
  onClearImage
}) {
  const { isDarkMode, toggleTheme } = useTheme()
  
  // Filter devices by selected brand
  const availableDevices = DEVICES_BY_BRAND[selectedBrand] || {}

  return (
    <div className="toolbar">
      <div className="toolbar-content">
        <Form.Group className="mb-0">
          <Form.Label htmlFor="image-upload" className="btn btn-success mb-0 custom-file-upload">
            <Upload size={18} className="me-2" />
            Cargar Imagen
          </Form.Label>
          <Form.Control
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            style={{ display: 'none' }}
          />
        </Form.Group>

        {!isCropping && hasImage && (
          <>
            <Button variant="primary" onClick={onStartCrop} title="Recortar Imagen">
              <Crop size={18} className="me-2" />
              Recortar
            </Button>
            <Button 
              variant={isGestureMode ? 'warning' : 'outline-warning'} 
              onClick={onGestureToggle}
              title="Simulador de Gestos"
            >
              <Hand size={18} className="me-2" />
              Gestos
            </Button>
            <Button 
              variant="danger" 
              onClick={onClearImage}
              title="Borrar Imagen"
            >
              <Trash2 size={18} className="me-2" />
              Borrar
            </Button>
          </>
        )}

        {isCropping && (
          <ButtonGroup>
            <Button variant="success" onClick={onConfirmCrop} title="Confirmar Recorte">
              <Check size={18} className="me-2" />
              Confirmar
            </Button>
            <Button variant="danger" onClick={onCancelCrop} title="Cancelar Recorte">
              <X size={18} className="me-2" />
              Cancelar
            </Button>
          </ButtonGroup>
        )}

        <BrandSelector 
          selectedBrand={selectedBrand}
          onBrandChange={onBrandChange}
          brands={BRANDS}
        />

        <Form.Select 
          value={currentDevice.id} 
          onChange={(e) => onDeviceChange(DEVICE_CONFIGS[e.target.value])}
          className="device-selector"
          disabled={isCustomMode}
        >
          {Object.values(availableDevices).map(device => (
            <option key={device.id} value={device.id}>
              {device.name}
            </option>
          ))}
        </Form.Select>

        <div className="custom-resolution-container">
          <Form.Check
            type="checkbox"
            id="custom-mode-toggle"
            label="Custom"
            checked={isCustomMode}
            onChange={onCustomModeToggle}
            className="custom-mode-checkbox"
          />
          
          {isCustomMode && (
            <div className="custom-inputs">
              <div className="custom-input-group">
                <Form.Control
                  type="number"
                  placeholder="Width"
                  value={customWidth}
                  onChange={(e) => onCustomWidthChange(e.target.value)}
                  className="custom-input"
                  min="1"
                  max="9999"
                />
                <span className="input-separator">×</span>
                <Form.Control
                  type="number"
                  placeholder="Height"
                  value={customHeight}
                  onChange={(e) => onCustomHeightChange(e.target.value)}
                  className="custom-input"
                  min="1"
                  max="9999"
                />
              </div>
            </div>
          )}
        </div>

        <Button 
          variant={isDarkMode ? 'light' : 'dark'} 
          onClick={toggleTheme}
          title={isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
          className="theme-toggle"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        <div className="device-info">
          <span className="badge bg-info">{currentDevice.description}</span>
        </div>
      </div>
    </div>
  )
}

export default Toolbar
