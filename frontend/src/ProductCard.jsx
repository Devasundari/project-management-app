import React, { useState } from 'react';
import { Edit3, Trash2, Package } from 'lucide-react';
import GlassCard from './GlassCard';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setIsDeleting(true);
      await onDelete(product.id);
      setIsDeleting(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <GlassCard className="product-card">
      <div className="product-image-container">
        {product.image && !imageError ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image"
            onError={handleImageError}
          />
        ) : (
          <div className="product-image-placeholder">
            <Package className="placeholder-icon" />
          </div>
        )}
        <div className="product-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(product);
            }}
            className="action-btn edit-btn"
          >
            <Edit3 className="icon-sm" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            disabled={isDeleting}
            className="action-btn delete-btn"
          >
            <Trash2 className="icon-sm" />
          </button>
        </div>
      </div>

      <div className="product-content">
        <h3 className="product-title">
          {product.name}
        </h3>
        <p className="product-description">
          {product.description}
        </p>
        <div className="product-id">
          ID: {product.id}
        </div>
      </div>
    </GlassCard>
  );
};

export default ProductCard;