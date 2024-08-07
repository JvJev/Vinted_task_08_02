import expressAsyncHandler from 'express-async-handler';
import Photo from '../models/photoModel.js';

export const addFavoritePhoto = expressAsyncHandler(async (req, res) => {
  const { photoId, alt, src } = req.body;
  const favoritePhoto = new Photo({
    user: req.user._id,
    photoId,
    alt,
    src,
  });
  const createdPhoto = await favoritePhoto.save();
  res.status(201).send(createdPhoto);
});

export const getFavoritePhotos = expressAsyncHandler(async (req, res) => {
  const favoritePhotos = await Photo.find({ user: req.user._id });
  res.send(favoritePhotos);
});

