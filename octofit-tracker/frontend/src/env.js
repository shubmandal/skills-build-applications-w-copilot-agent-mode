export const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
export const API_BASE = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

if (!CODESPACE_NAME && window.location.hostname !== 'localhost') {
  console.warn('VITE_CODESPACE_NAME is not defined. Set VITE_CODESPACE_NAME in .env.local to use Codespaces API URL.');
}
