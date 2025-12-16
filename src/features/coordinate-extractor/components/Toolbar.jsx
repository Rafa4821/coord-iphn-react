import { Button, ButtonGroup, Form } from 'react-bootstrap'
import { Upload, Crop, Check, X, Moon, Sun, Hand } from 'lucide-react'
import { useTheme } from '../../../context/ThemeContext'
import { DEVICE_CONFIGS } from '../constants/deviceConfig'
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
  isGestureMode
}) {
  const { isDarkMode, toggleTheme } = useTheme()

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

        <Form.Select 
          value={currentDevice.id} 
          onChange={(e) => onDeviceChange(DEVICE_CONFIGS[e.target.value])}
          className="device-selector"
        >
          {Object.values(DEVICE_CONFIGS).map(device => (
            <option key={device.id} value={device.id}>
              {device.name}
            </option>
          ))}
        </Form.Select>

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
