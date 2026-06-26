import { useEffect, useState } from 'react';
import { normalizeResponse } from '../api.js';

const ACTIVITIES_ENDPOINT = `${
  import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000'
}/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(ACTIVITIES_ENDPOINT)
      .then((response) => response.json())
      .then((data) => setActivities(normalizeResponse(data.activities ?? data)))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error && <p className="error">{error}</p>}
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? activity.id}>
                <td>{activity.user?.name ?? 'Unknown'}</td>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.caloriesBurned}</td>
                <td>{new Date(activity.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Activities;
