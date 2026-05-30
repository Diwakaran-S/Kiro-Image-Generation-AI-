import { useState } from 'react';
import { LayoutGrid, Search, Trash2, Download, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ImageCard from '../components/ImageCard';
import { downloadImage } from '../utils/api';

const CATEGORIES = ['All', 'Generated', 'Logo', 'Hero', 'Icon', 'Portrait', 'Background', 'UI Asset'];

export default function GalleryPage() {
  const { gallery, clearGallery, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewItem, setViewItem] = useState(null);

  const filtered = gallery.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = !search || item.prompt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleClearAll = () => {
    if (window.confirm('Clear all gallery images? This cannot be undone.')) {
      clearGallery();
      showToast('Gallery cleared', 'info');
    }
  };

  return (
    <div className="page">
      <div className="section-header">
        <h2 className="section-title">
          <LayoutGrid size={18} style={{ color: 'var(--cyan)' }} />
          GALLERY
        </h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)', alignSelf: 'center', fontFamily: 'var(--mono)' }}>
            {filtered.length} / {gallery.length} images
          </span>
          {gallery.length > 0 && (
            <button className="btn btn-danger btn-sm" onClick={handleClearAll}>
              <Trash2 size={13} /> Clear All
            </button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="gallery-controls">
        <div className="search-input-wrap">
          <Search size={14} />
          <input
            className="input"
            placeholder="Search by prompt..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`chip${activeCategory === cat ? ' selected' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><LayoutGrid size={32} /></div>
          <h3 className="empty-title">NO IMAGES YET</h3>
          <p className="empty-desc">
            {gallery.length === 0
              ? 'Go to the Generate page and create your first AI image!'
              : 'No images match your current filter.'}
          </p>
        </div>
      ) : (
        <div className="gallery-grid">
          {filtered.map(item => (
            <ImageCard key={item.id} item={item} onView={setViewItem} />
          ))}
        </div>
      )}

      {/* Lightbox modal */}
      {viewItem && (
        <div className="modal-backdrop" onClick={() => setViewItem(null)}>
          <div className="modal" style={{ maxWidth: 960 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span style={{ fontFamily: 'var(--title)', fontSize: 14, letterSpacing: 2 }}>IMAGE DETAILS</span>
              <button className="btn btn-ghost btn-sm btn-icon" onClick={() => setViewItem(null)}>
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
                <img
                  src={viewItem.url}
                  alt={viewItem.prompt}
                  referrerPolicy="no-referrer"
                  style={{ width: '100%', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <div className="field-label" style={{ marginBottom: 6 }}>PROMPT</div>
                    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{viewItem.prompt}</p>
                  </div>
                  {viewItem.negative && (
                    <div>
                      <div className="field-label" style={{ marginBottom: 6 }}>NEGATIVE</div>
                      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{viewItem.negative}</p>
                    </div>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    <span className="badge badge-cyan">{viewItem.category}</span>
                    {viewItem.lighting && <span className="badge badge-purple">{viewItem.lighting}</span>}
                    {viewItem.style && <span className="badge badge-pink">{viewItem.style}</span>}
                    {viewItem.aspectRatio && <span className="badge badge-green">{viewItem.aspectRatio}</span>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                    Model: {viewItem.model}<br />
                    Created: {new Date(viewItem.createdAt).toLocaleString()}
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => { downloadImage(viewItem.url, `ai-studio-${viewItem.id}.png`); showToast('Downloaded!', 'success'); }}
                  >
                    <Download size={14} /> Download Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
