import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Users from './components/Users.jsx';
import Teams from './components/Teams.jsx';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Workouts from './components/Workouts.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header>
          <h1>OctoFit Tracker</h1>
          <nav>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/activities">Activities</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/workouts">Workouts</NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Users />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
