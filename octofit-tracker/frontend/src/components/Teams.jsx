import { useEffect, useState } from 'react';
import { getApiUrl, normalizeResponse } from '../api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(getApiUrl('/api/teams/'))
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
