import { Schema, model, models } from 'mongoose';

const MovieSchema = new Schema({
  name: String,
  releaseYear: String,
  genre: String,
});

const Movie = models.movie || model('movie', MovieSchema);

export default Movie;