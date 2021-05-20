import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/Movie';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) throw new NotFoundException(`Movie id ${id} not found!`);
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(movieData): Movie {
    this.movies.push({
      ...movieData,
      id: this.movies.length + 1,
    });
    return this.movies[this.movies.length - 1];
  }

  update(id: number, movieData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.create({
      ...movie,
      ...movieData,
    });
  }
}
