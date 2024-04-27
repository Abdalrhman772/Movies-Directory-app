import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  imdbId!: string;
  movieData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.imdbId = val['imdbId'];
    });
    this.getMovieData();
  }

  getMovieData() {
    this.movieService.getMovieDetails(this.imdbId).subscribe({
      next: (data) => {
        this.movieData = data;
      },

      error: (err) => {
        console.log('get movie details error : '+err);
      },
    });
  }
}
