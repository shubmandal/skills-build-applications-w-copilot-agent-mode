import { useEffect, useState } from 'react';
import { normalizeResponse } from '../api.js';

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
const API_BASE = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
const USERS_ENDPOINT = `${API_BASE}/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(USERS_ENDPOINT)
      .then((response) => response.json())
      .then((data) => setUsers(normalizeResponse(data.users ?? data)))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error && <p className="error">{error}</p>}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id ?? user.id}>
              <strong>{user.name}</strong> ({user.email}) - {user.role}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Users;
