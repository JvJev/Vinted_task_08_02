import express from 'express';
import { addFavoritePhoto, getFavoritePhotos } from '../controllers/photoController.js';
import { isAuth } from '../utils.js';

const photoRouter = express.Router();

photoRouter.post('/', isAuth, addFavoritePhoto); // Add favorite photo
photoRouter.get('/', isAuth, getFavoritePhotos); // Get favorite photos

export default photoRouter;
