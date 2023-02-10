import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  email: String,
  image: String,
  emailVerified: Boolean,
  likedMovies: [String],
  watchListMovies: [String],
  likedSeries: [String],
  watchListSeries: [String],
});

const User = models.users || model('users', UserSchema);

export default User;