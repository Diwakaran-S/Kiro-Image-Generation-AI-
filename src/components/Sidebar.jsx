import { NavLink } from 'react-router-dom';
import { Zap, Image, LayoutGrid, Home, Settings, Cpu } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Sidebar() {
  const { gallery } = useApp();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>AI STUDIO</h1>
        <p>// cyberpunk creative</p>
      </div>

      <nav className="sidebar-nav">
        <span className="nav-section-label">NAVIGATE</span>

        <NavLink to="/" end className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <Home size={16} />
          Home
        </NavLink>

        <NavLink to="/generate" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <Zap size={16} />
          Generate
        </NavLink>

        <NavLink to="/gallery" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <LayoutGrid size={16} />
          Gallery
        </NavLink>

        <span className="nav-section-label" style={{ marginTop: 8 }}>SYSTEM</span>

        <NavLink to="/settings" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <Settings size={16} />
          Settings
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="gallery-count-badge">
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Image size={13} />
            Gallery
          </span>
          <span className="count">{gallery.length}</span>
        </div>
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
          <Cpu size={11} />
          FLUX · Pollinations.ai
        </div>
      </div>
    </aside>
  );
}
