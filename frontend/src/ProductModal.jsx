import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import GlassCard from './GlassCard';

const ProductModal = ({ isOpen, onClose, onSubmit, product, isEditing }) => {
  const [formData, setFormData] = useState({ name: '', description: '', image: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product && isEditing) {
      setFormData({ 
        name: product.name, 
        description: product.description,
        image: product.image || ''
      });
    } else {
      setFormData({ name: '', description: '', image: '' });
    }
  }, [product, isEditing, isOpen]);

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;
    
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    setFormData({ name: '', description: '', image: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <GlassCard className="modal-content">
        <button
          onClick={onClose}
          className="modal-close"
        >
          <X className="icon" />
        </button>
        
        <h2 className="modal-title">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h2>
        
        <div className="form-container">
          <div className="form-group">
            <label className="form-label">
              Product Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Product Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="form-input"
              placeholder="Enter image URL (optional)"
            />
            {formData.image && (
              <div className="image-preview">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="preview-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="form-textarea"
              placeholder="Enter product description"
              required
            />
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.name.trim()}
              className="btn btn-primary"
            >
              {isSubmitting ? (
                <div className="spinner" />
              ) : (
                <>
                  <Check className="icon" />
                  <span>{isEditing ? 'Update' : 'Create'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ProductModal;