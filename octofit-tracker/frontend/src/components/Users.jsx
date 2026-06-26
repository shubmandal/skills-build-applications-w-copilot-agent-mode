import { useEffect, useState } from 'react';
import { getApiUrl, normalizeResponse } from '../api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(getApiUrl('/api/users/'))
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
