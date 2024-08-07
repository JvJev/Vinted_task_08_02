import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Jev',
      email: 'jevgenij.voronov@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
  ],
  favoritePhotos: [], // Add this for favorite photos later
};

export default data;
