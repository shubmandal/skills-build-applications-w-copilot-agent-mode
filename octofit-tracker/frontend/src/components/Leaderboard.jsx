import { useEffect, useState } from 'react';
import { getApiUrl, normalizeResponse } from '../api.js';

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(getApiUrl('/api/leaderboard/'))
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
