import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from 'src/app/models/movie.model';
import { MatPaginator } from '@angular/material/paginator';
import { MovieService } from 'src/app/services/movie.service';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements AfterViewInit {
  displayedColumns: string[] = ['Poster', 'Title', 'Year'];
  dataSource = new MatTableDataSource<Movie>();
  searchKeyword = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private movieService: MovieService, private router: Router) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search() {
    if (!this.searchKeyword.trim()) {
      return;
    }
    this.movieService.search(this.searchKeyword).subscribe((res) => {
      this.dataSource.data = res.Search;
    });
  }

  goToDetails(imdbId: string) {
    this.router.navigate(['/movie', imdbId]);
  }
}
