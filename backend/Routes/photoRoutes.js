import express from 'express';
import { addFavoritePhoto, getFavoritePhotos, removeFavoritePhoto } from '../controllers/photoController.js';
import { isAuth } from '../utils.js';

const photoRouter = express.Router();

photoRouter.post('/', isAuth, addFavoritePhoto); // Add favorite photo
photoRouter.get('/', isAuth, getFavoritePhotos); // Get all favorite photos
photoRouter.delete('/:photoId', isAuth, removeFavoritePhoto); // Remove favorite photo

export default photoRouter;
