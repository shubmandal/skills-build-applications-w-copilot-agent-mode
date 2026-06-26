import { API_BASE } from './env.js';

export function getApiUrl(path) {
  return `${API_BASE}${path}`;
}

export function normalizeResponse(data) {
  if (Array.isArray(data)) return data;
  if (data?.items) return data.items;
  if (data?.results) return data.results;
  return data;
}
