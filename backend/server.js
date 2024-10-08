import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import seedRouter from './routes/seedRoutes.js';
import userRouter from './routes/userRoutes.js';
import photoRouter from './routes/photoRoutes.js'; // Add this line
import seedRouter from './routes/seedRouter.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to mongo');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/users', userRouter);
app.use('/api/photos', photoRouter); // Add this line

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
