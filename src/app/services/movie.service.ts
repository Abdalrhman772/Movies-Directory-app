import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'https://www.omdbapi.com/';
  private apiKey = '674ad000';

  constructor(private httpClient: HttpClient) {}

  search(searchKeyword: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}?s=${searchKeyword}&apikey=${this.apiKey}`
    );
  }

  getMovieDetails(imdbId: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}?i=${imdbId}&apikey=${this.apiKey}`
    );
  }
}
