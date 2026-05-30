import { Download, Trash2, Eye, Copy } from 'lucide-react';
import { downloadImage } from '../utils/api';
import { useApp } from '../context/AppContext';

export default function ImageCard({ item, onView }) {
  const { removeFromGallery, showToast } = useApp();

  const handleDownload = (e) => {
    e.stopPropagation();
    downloadImage(item.url, `ai-studio-${item.id}.png`);
    showToast('Image downloaded!', 'success');
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    removeFromGallery(item.id);
    showToast('Removed from gallery', 'info');
  };

  const handleCopyPrompt = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.prompt).then(() => {
      showToast('Prompt copied!', 'success');
    });
  };

  const timeAgo = (iso) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="image-card">
      <div className="image-card-img-wrap" onClick={() => onView && onView(item)}>
        <img src={item.url} alt={item.prompt} loading="lazy" referrerPolicy="no-referrer" />
        <div className="image-card-overlay">
          <button className="btn btn-ghost btn-sm btn-icon" onClick={handleDownload} title="Download">
            <Download size={14} />
          </button>
          <button className="btn btn-ghost btn-sm btn-icon" onClick={handleCopyPrompt} title="Copy prompt">
            <Copy size={14} />
          </button>
          <button className="btn btn-ghost btn-sm btn-icon" onClick={() => onView && onView(item)} title="View full">
            <Eye size={14} />
          </button>
          <button className="btn btn-danger btn-sm btn-icon" onClick={handleDelete} title="Delete">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="image-card-info">
        <p className="image-card-prompt">{item.prompt}</p>
        <div className="image-card-meta">
          <span className="badge badge-cyan">{item.category}</span>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            {timeAgo(item.createdAt)}
          </span>
        </div>
        {item.lighting && (
          <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {item.lighting && <span className="badge badge-purple">{item.lighting}</span>}
            {item.style    && <span className="badge badge-pink">{item.style}</span>}
            {item.aspectRatio && <span className="badge badge-green">{item.aspectRatio}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
