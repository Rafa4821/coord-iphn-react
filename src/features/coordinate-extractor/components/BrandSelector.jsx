import { Apple, Smartphone } from 'lucide-react'
import './BrandSelector.css'

const BrandSelector = ({ selectedBrand, onBrandChange, brands }) => {
  return (
    <div className="brand-selector">
      <div className="brand-tabs">
        <button
          className={`brand-tab ${selectedBrand === brands.IPHONE ? 'active' : ''}`}
          onClick={() => onBrandChange(brands.IPHONE)}
          title="iPhone"
        >
          <Apple size={20} />
          <span>iPhone</span>
        </button>
        <button
          className={`brand-tab ${selectedBrand === brands.SAMSUNG ? 'active' : ''}`}
          onClick={() => onBrandChange(brands.SAMSUNG)}
          title="Samsung"
        >
          <Smartphone size={20} />
          <span>Samsung</span>
        </button>
      </div>
    </div>
  )
}

export default BrandSelector
