import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

const GALLERY_KEY = 'ai_studio_gallery';

export function AppProvider({ children }) {
  const [gallery, setGallery] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Load gallery from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(GALLERY_KEY);
      if (stored) setGallery(JSON.parse(stored));
    } catch (_) {}
  }, []);

  // Persist gallery to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(GALLERY_KEY, JSON.stringify(gallery));
    } catch (_) {}
  }, [gallery]);

  const addToGallery = useCallback((item) => {
    const entry = {
      id: Date.now().toString(),
      url: item.url,
      prompt: item.prompt,
      positivePrompt: item.positivePrompt,
      negative: item.negative || '',
      lighting: item.lighting || '',
      style: item.style || '',
      aspectRatio: item.aspectRatio || '1:1',
      category: item.category || 'Generated',
      model: item.model || 'stable-diffusion-v1-5',
      createdAt: new Date().toISOString(),
    };
    setGallery(prev => [entry, ...prev]);
    return entry;
  }, []);

  const removeFromGallery = useCallback((id) => {
    setGallery(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearGallery = useCallback(() => setGallery([]), []);

  // Toast system
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  return (
    <AppContext.Provider value={{
      gallery,
      addToGallery,
      removeFromGallery,
      clearGallery,
      toasts,
      showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
