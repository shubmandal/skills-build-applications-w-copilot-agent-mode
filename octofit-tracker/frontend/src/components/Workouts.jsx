import { useEffect, useState } from 'react';
import { getApiUrl, normalizeResponse } from '../api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(getApiUrl('/api/workouts/'))
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
