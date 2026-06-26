import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true },
  notes: { type: String, default: '' },
});

const Activity = mongoose.model('Activity', ActivitySchema);
export default Activity;
