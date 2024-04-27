// import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { Movie } from 'src/app/models/movie.model';
// import { MatPaginator } from '@angular/material/paginator';
// import { MovieService } from 'src/app/services/movie.service';
// import { MatSort, Sort } from '@angular/material/sort';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-home-page',
//   templateUrl: './home-page.component.html',
//   styleUrls: ['./home-page.component.css'],
// })
// export class HomePageComponent implements AfterViewInit {
//   displayedColumns: string[] = ['poster', 'title', 'year'];
//   dataSource = new MatTableDataSource<Movie>();
//   searchKeyword = '';

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   constructor(private movieService: MovieService, private router: Router) {}

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }

//   search() {
//     if (!this.searchKeyword.trim()) {
//       return;
//     }
//     this.movieService.search(this.searchKeyword).subscribe((res) => {
//       this.dataSource.data = res.Search;
//     });
//   }

//   goToDetails(imdbId: string) {
//     this.router.navigate(['/movie', imdbId]);
//   }
// }

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements AfterViewInit {
  displayedColumns: string[] = ['poster', 'title', 'year'];
  dataSource = new MatTableDataSource<any>();
  searchKeyword = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private movieService: MovieService, private router: Router) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'title':
          return item.Title.toLowerCase(); 
        case 'year':
          return item.Year;
        default:
          return item[property];
      }
    };
  }

  search() {
    if (!this.searchKeyword.trim()) {
      return;
    }
    this.movieService.search(this.searchKeyword).subscribe((res) => {
      this.dataSource.data = res.Search;
      this.dataSource.sort?.sort(<any>{ id: 'title', start: 'asc' });
      this.dataSource.sort?.sort(<any>{ id: 'year', start: 'asc' });
    });
  }

  goToDetails(imdbId: string) {
    this.router.navigate(['/movie', imdbId]);
  }
}
