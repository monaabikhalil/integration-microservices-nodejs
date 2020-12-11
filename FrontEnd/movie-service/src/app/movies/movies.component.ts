import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: any;

  constructor(private movieSerive: MovieService) {

  }

  ngOnInit(): void {

  }

  addNewMovie(name: string,  producer: string, price: number ): void {
    const movie: Movie = {
      name: String(name),
      producer: String(producer),
      price: Number(price),
      status: 1
    };
    this.movieSerive.addMovie(movie).subscribe(() => { }, (error) => console.log(error), () => {
      console.log('Data Insert');
      window.location.reload();
    });
  }

  getMovies() {
    this.movieSerive.getMovies()
    .subscribe((data) => {
      this.movies = data;
    });

    // this.movies = this.movieSerive.getMovies();
  }

}
