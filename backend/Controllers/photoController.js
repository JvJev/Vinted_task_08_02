import Photo from '../models/photoModel.js';

// Add favorite photo to the database
export const addFavoritePhoto = async (req, res) => {
  try {
    const { photoId, alt, src } = req.body;

    const existingPhoto = await Photo.findOne({ photoId, user: req.user._id });
    if (existingPhoto) {
      return res.status(400).json({ message: 'Photo already in favorites' });
    }

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

// Remove a favorite photo from the database
export const removeFavoritePhoto = async (req, res) => {
  try {
    const { photoId } = req.params;
    const result = await Photo.findOneAndDelete({ photoId, user: req.user._id });

    if (!result) {
      return res.status(404).json({ message: 'Photo not found in favorites' });
    }

    res.status(204).end(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
