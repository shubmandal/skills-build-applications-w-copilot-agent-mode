import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  durationMinutes: { type: Number, required: true },
  focusAreas: [{ type: String }],
  createdAt: { type: Date, default: () => new Date() },
});

const Workout = mongoose.model('Workout', WorkoutSchema);
export default Workout;
