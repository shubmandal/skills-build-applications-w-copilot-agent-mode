import { useEffect, useState } from 'react';
import { normalizeResponse } from '../api.js';

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
const API_BASE = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
const TEAMS_ENDPOINT = `${API_BASE}/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(TEAMS_ENDPOINT)
      .then((response) => response.json())
      .then((data) => setTeams(normalizeResponse(data.teams ?? data)))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error && <p className="error">{error}</p>}
      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={team._id ?? team.id}>
              <strong>{team.name}</strong> - {team.description}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Teams;
