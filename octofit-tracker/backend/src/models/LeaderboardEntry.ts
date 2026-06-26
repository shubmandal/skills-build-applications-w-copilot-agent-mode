import mongoose from 'mongoose';

const LeaderboardEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() },
});

const LeaderboardEntry = mongoose.model('LeaderboardEntry', LeaderboardEntrySchema);
export default LeaderboardEntry;
