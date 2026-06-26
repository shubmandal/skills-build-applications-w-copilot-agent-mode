import { useEffect, useState } from 'react';
import { normalizeResponse } from '../api.js';

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
const API_BASE = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
const LEADERBOARD_ENDPOINT = `${API_BASE}/api/leaderboard/`;

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(LEADERBOARD_ENDPOINT)
      .then((response) => response.json())
      .then((data) => setScores(normalizeResponse(data.leaderboard ?? data)))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <p className="error">{error}</p>}
      {scores.length === 0 ? (
        <p>No leaderboard entries found.</p>
      ) : (
        <ol>
          {scores.map((entry) => (
            <li key={entry._id ?? entry.id}>
              <strong>{entry.user?.name ?? 'Unknown'}</strong> — {entry.score} pts
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default Leaderboard;
