import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function ToastContainer() {
  const { toasts } = useApp();

  const iconMap = {
    success: <CheckCircle size={16} style={{ color: 'var(--green)' }} />,
    error:   <AlertCircle size={16} style={{ color: 'var(--pink)' }} />,
    info:    <Info size={16} style={{ color: 'var(--cyan)' }} />,
  };

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          {iconMap[t.type] || iconMap.info}
          {t.message}
        </div>
      ))}
    </div>
  );
}
