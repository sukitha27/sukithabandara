import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { NotFound } from './components/NotFound.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';

function Root() {
  // Simple client-side 404 — Vercel serves index.html for all routes,
  // so we detect non-root paths here and render NotFound.
  const path = window.location.pathname;
  const is404 = path !== '/' && !path.startsWith('/#');

  return (
    <ThemeProvider>
      {is404 ? <NotFound /> : <App />}
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
