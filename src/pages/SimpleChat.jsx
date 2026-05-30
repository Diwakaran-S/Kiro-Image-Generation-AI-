import ChatBot from "../components/ChatBot";
import { useState } from "react";
import { useApp } from "../context/AppContext";

const DEFAULT_SETTINGS = {
  negative: "",
  aspectRatio: "1:1",
  lighting: "neon",
  style: "cyberpunk",
  category: "Generated",
};

export default function SimpleChat() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const { gallery } = useApp();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 20, gap: 30, minHeight: "80vh", background: "var(--surface)" }}>

      {/* Centered ChatBot (small) */}
      <div style={{ width: "100%", maxWidth: 560, border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
        <ChatBot settings={settings} onSettingsChange={setSettings} />
      </div>

      {/* Generated images section */}
      <h2 style={{ fontFamily: "var(--title)", fontSize: 20, color: "var(--text)", margin: 0 }}>Generated Images</h2>
      {gallery.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>No images generated yet.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12, width: "100%", maxWidth: 800 }}>
          {gallery.map(item => (
            <div key={item.id} style={{ overflow: "hidden", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
              <img src={item.url} alt={item.prompt} referrerPolicy="no-referrer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
