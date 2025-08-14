import React from 'react';
import { Search, Plus } from 'lucide-react';
import GlassCard from './GlassCard';

const SearchBar = ({ searchTerm, onSearchChange, onAddNew }) => (
  <GlassCard className="search-container">
    <div className="search-wrapper">
      <div className="search-input-wrapper">
        <Search className="search-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="search-input"
        />
      </div>
      <button
        onClick={onAddNew}
        className="btn btn-success"
      >
        <Plus className="icon" />
        <span>Add Product</span>
      </button>
    </div>
  </GlassCard>
);

export default SearchBar;