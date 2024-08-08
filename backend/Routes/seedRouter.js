import express from 'express';
import data from '../data.js'; // Adjust the path as necessary
import Photo from '../models/photoModel.js'; // Adjust according to your schema

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Photo.deleteMany({});
  const createdPhotos = await Photo.insertMany(data.photos);
  res.send({ createdPhotos });
});

export default seedRouter;
