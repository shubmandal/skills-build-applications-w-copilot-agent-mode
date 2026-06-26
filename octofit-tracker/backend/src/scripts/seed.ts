import mongoose from 'mongoose';
import { connectDatabase, mongoUri } from '../config/database.js';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Workout from '../models/Workout.js';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();
  console.log(`Connected to MongoDB at ${mongoUri}`);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const teams = await Team.create([
    { name: 'Apollo Runners', description: 'A dedicated running team focused on endurance and outdoor challenges.' },
    { name: 'Zen Strength', description: 'Strength training group with a focus on functional fitness and recovery.' },
  ]);

  const users = await User.create([
    { name: 'Jasmine Rivera', email: 'jasmine.rivera@example.com', role: 'member', team: teams[0]._id },
    { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'coach', team: teams[0]._id },
    { name: 'Avery Chen', email: 'avery.chen@example.com', role: 'member', team: teams[1]._id },
    { name: 'Mia Johnson', email: 'mia.johnson@example.com', role: 'admin', team: teams[1]._id },
  ]);

  teams[0].members = [users[0]._id, users[1]._id];
  teams[1].members = [users[2]._id, users[3]._id];
  await Promise.all([teams[0].save(), teams[1].save()]);

  const workouts = await Workout.create([
    {
      name: 'Morning Interval Boost',
      description: 'High-intensity intervals to kickstart your day with calories burned and stamina built.',
      difficulty: 'medium',
      durationMinutes: 30,
      focusAreas: ['cardio', 'speed', 'endurance'],
    },
    {
      name: 'Core Stability Flow',
      description: 'Core-strength program blending stability work with dynamic movement.',
      difficulty: 'easy',
      durationMinutes: 25,
      focusAreas: ['core', 'mobility', 'balance'],
    },
    {
      name: 'Strength Circuit Challenge',
      description: 'Full-body circuit using bodyweight and light resistance for sustainable power.',
      difficulty: 'hard',
      durationMinutes: 45,
      focusAreas: ['strength', 'power', 'recovery'],
    },
  ]);

  const activities = await Activity.create([
    {
      user: users[0]._id,
      type: 'Trail run',
      durationMinutes: 55,
      caloriesBurned: 760,
      date: new Date(Date.now() - 1000 * 60 * 60 * 6),
      notes: 'Focused on pacing and hill intervals.',
    },
    {
      user: users[2]._id,
      type: 'Yoga flow',
      durationMinutes: 40,
      caloriesBurned: 280,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
      notes: 'Recovery session after strength training.',
    },
    {
      user: users[3]._id,
      type: 'Weight circuit',
      durationMinutes: 50,
      caloriesBurned: 620,
      date: new Date(Date.now() - 1000 * 60 * 60 * 48),
      notes: 'Super set format with full-body emphasis.',
    },
  ]);

  const leaderboard = await LeaderboardEntry.create([
    { user: users[0]._id, score: 1540, rank: 1 },
    { user: users[2]._id, score: 1380, rank: 2 },
    { user: users[1]._id, score: 1210, rank: 3 },
  ]);

  console.log('Seed data inserted successfully:');
  console.log(`- users: ${users.length}`);
  console.log(`- teams: ${teams.length}`);
  console.log(`- activities: ${activities.length}`);
  console.log(`- leaderboard entries: ${leaderboard.length}`);
  console.log(`- workouts: ${workouts.length}`);

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

seedDatabase().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
