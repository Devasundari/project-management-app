import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import GlassCard from './GlassCard';
import { Package } from 'lucide-react';

// API base URL - update this to match your backend
const API_BASE_URL = 'http://localhost:5000';

const ProductManagementApp = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // API functions
 const fetchProducts = async () => {
  setIsLoading(true);
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    setProducts(data);
    setFilteredProducts(data);
  } catch (error) {
    console.error('Error fetching products:', error);

    // Use mock data if API fails
    // const mockData = [
    //   { id: 1, name: 'Wireless Headphones', description: 'Premium noise-cancelling wireless headphones with 30-hour battery life', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center' },
    //   { id: 2, name: 'Smart Watch', description: 'Advanced fitness tracking smartwatch with heart rate monitoring', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center' },
    //   { id: 3, name: 'Laptop Stand', description: 'Ergonomic aluminum laptop stand with adjustable height', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop&crop=center' },
    //   { id: 4, name: 'Wireless Mouse', description: 'Precision wireless mouse with ergonomic design and long battery life', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop&crop=center' },
    //   { id: 5, name: 'USB-C Hub', description: 'Multi-port USB-C hub with HDMI, USB 3.0, and charging capabilities', image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=300&fit=crop&crop=center' },
    //   { id: 6, name: 'Bluetooth Speaker', description: 'Portable waterproof Bluetooth speaker with 360° sound', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop&crop=center' }
    // ];

    setProducts(mockData);
    setFilteredProducts(mockData);
  } finally {
    setIsLoading(false);
  }
};


  const createProduct = async (productData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      
      if (response.ok) {
        fetchProducts();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      // Mock creation for demo
      const newProduct = { 
        id: Date.now(), 
        ...productData 
      };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setIsModalOpen(false);
    }
  };

  const updateProduct = async (productData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      
      if (response.ok) {
        fetchProducts();
        setIsModalOpen(false);
        setEditingProduct(null);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      // Mock update for demo
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id ? { ...p, ...productData } : p
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setIsModalOpen(false);
      setEditingProduct(null);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      // Mock deletion for demo
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    }
  };

  // Effects
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // Event handlers
  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData) => {
    if (editingProduct) {
      updateProduct(formData);
    } else {
      createProduct(formData);
    }
  };

  return (
    <div className="app-container">
      <div className="background-effects">
        <div className="bg-circle bg-circle-1" />
        <div className="bg-circle bg-circle-2" />
        <div className="bg-circle bg-circle-3" />
      </div>

      <div className="main-content">
        <div className="header">
          <h1 className="main-title">
            Product Management
          </h1>
          <p className="main-subtitle">
            Manage your products with style and efficiency
          </p>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddNew={handleAddNew}
        />

        {isLoading ? (
          <LoadingSpinner />
        ) : filteredProducts.length === 0 ? (
          <GlassCard className="empty-state">
            <Package className="empty-icon" />
            <h3 className="empty-title">
              {searchTerm ? 'No products found' : 'No products yet'}
            </h3>
            <p className="empty-description">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Get started by adding your first product'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddNew}
                className="btn btn-primary"
              >
                Add Your First Product
              </button>
            )}
          </GlassCard>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={deleteProduct}
              />
            ))}
          </div>
        )}

        <ProductModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          onSubmit={handleModalSubmit}
          product={editingProduct}
          isEditing={!!editingProduct}
        />
      </div>
    </div>
  );
};

export default ProductManagementApp;