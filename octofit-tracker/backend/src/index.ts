import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.ts';
import Team from './models/Team.ts';
import Activity from './models/Activity.ts';
import LeaderboardEntry from './models/LeaderboardEntry.ts';
import Workout from './models/Workout.ts';

const app = express();
const PORT = Number(process.env.PORT ?? 8000);
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/octofit_db';
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running.', apiBaseUrl: API_BASE_URL });
});

app.get('/api/users/', async (_req, res) => {
  const users = await User.find().populate('team', 'name description');
  res.json({ users });
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find().populate('members', 'name email');
  res.json({ teams });
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find().sort({ date: -1 }).populate('user', 'name');
  res.json({ activities });
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ score: -1 }).populate('user', 'name');
  res.json({ leaderboard });
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find().sort({ difficulty: 1 });
  res.json({ workouts });
});

app.get('/api/config', (_req, res) => {
  res.json({
    apiBaseUrl: API_BASE_URL,
    port: PORT,
    codespaceName: CODESPACE_NAME ?? null,
  });
});

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
      if (CODESPACE_NAME) {
        console.log(`Codespaces API URL: ${API_BASE_URL}`);
      }
      console.log(`MongoDB connected at ${MONGO_URI}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
