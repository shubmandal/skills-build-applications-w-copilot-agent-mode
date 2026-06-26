import { useEffect, useState } from 'react';
import { normalizeResponse } from '../api.js';

const WORKOUTS_ENDPOINT = `${
  import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000'
}/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(WORKOUTS_ENDPOINT)
      .then((response) => response.json())
      .then((data) => setWorkouts(normalizeResponse(data.workouts ?? data)))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error && <p className="error">{error}</p>}
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id ?? workout.id}>
              <strong>{workout.name}</strong> ({workout.difficulty}) - {workout.durationMinutes} min
              <div>{workout.description}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Workouts;
