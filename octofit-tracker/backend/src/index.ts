import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/octofit-tracker';

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running.' });
});

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
      console.log(`MongoDB connected at ${MONGO_URI}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
