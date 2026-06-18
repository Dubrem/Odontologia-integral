import { createRoot } from 'react-dom/client';
// Register GSAP plugins globally before any component renders
import './config/gsap.config';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
