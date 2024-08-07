import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    photoId: { type: String, required: true },
    alt: { type: String, required: true },
    src: { type: String, required: true }, // Store the image URL
  },
  {
    timestamps: true,
  }
);

const Photo = mongoose.model('Photo', photoSchema);
export default Photo;
