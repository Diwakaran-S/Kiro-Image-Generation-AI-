import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ToastContainer from './components/ToastContainer';
import SimpleChat from './pages/SimpleChat';

function AppShell() {
  return (
    <Routes>
      <Route path="*" element={<SimpleChat />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppShell />
        <ToastContainer />
      </AppProvider>
    </BrowserRouter>
  );
}
