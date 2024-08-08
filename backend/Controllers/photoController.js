import Photo from '../models/photoModel.js';

// Add favorite photo to the database
export const addFavoritePhoto = async (req, res) => {
  try {
    const { photoId, alt, src } = req.body;
    const photo = new Photo({
      user: req.user._id,
      photoId,
      alt,
      src,
    });
    const savedPhoto = await photo.save();
    res.status(201).json(savedPhoto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all favorite photos for the authenticated user
export const getFavoritePhotos = async (req, res) => {
  try {
    const photos = await Photo.find({ user: req.user._id });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
