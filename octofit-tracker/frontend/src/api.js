const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
const API_HOST = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : window.location.hostname === 'localhost'
  ? 'http://localhost:8000'
  : '';

if (!CODESPACE_NAME && !API_HOST) {
  console.warn('VITE_CODESPACE_NAME is not defined and the app is not running on localhost. API requests may fail.');
}

export function getApiUrl(path) {
  return `${API_HOST}${path}`;
}

export function normalizeResponse(data) {
  if (Array.isArray(data)) return data;
  if (data?.items) return data.items;
  if (data?.results) return data.results;
  return data;
}
