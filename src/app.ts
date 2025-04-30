import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes'
import authRouter from './routes/auth.routes';

const app = express(); // creates the express application

app.use(cors(
  {
      origin: 'http://localhost:3000',
      credentials: true
  }
)); // allows cross-origin requests (useful when frontend is on a different port)
app.use(express.json()); // lets Express read JSON request bodies

app.use('/api/auth', authRouter);
// Route handler for all user-related API calls
app.use('/api/users', userRouter);

// A simple test route
app.get('/', (req, res) => {
  res.send('Niche Community API is running');
});

export default app; // exports the app so server.ts can use it
