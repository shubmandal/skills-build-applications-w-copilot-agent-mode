import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase() {
  await mongoose.connect(MONGO_URI);
  return mongoose.connection;
}

export const mongoUri = MONGO_URI;
export default mongoose;
