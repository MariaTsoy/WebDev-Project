import { Injectable } from '@angular/core';
import {Album, Photo} from './models';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  BASE_URL = 'https://jsonplaceholder.typicode.com';
  BASE_URL1 = 'https://picsum.photos';

  baseUrl = 'http://127.0.0.1:8000/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private client: HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  getAlbums(): Observable<Album[]> {
    return this.client.get<Album[]>(`${this.baseUrl}/albums`);
  }
  getPhotos(id: number): Observable<Photo[]> {
    return this.client.get<Photo[]>(`${this.baseUrl}/albums/${id}/photo`);
  }
  getPhoto(albumId: number, id: number): Observable<Photo>{
    return this.client.get<Photo>(`${this.baseUrl}/albums/${albumId}/photo/${id}/`);
  }
  deleteAlbum(id: number): Observable<any> {
    return this.client.delete(`${this.baseUrl}/albums/${id}`);
  }
  updateAlbum(album: Album): Observable<Album> {
    return this.client.put<Album>(`${this.baseUrl}/albums/${album.id}/`, album);
  }
  addAlbum(album: Album): Observable<Album> {
    return this.client.post<Album>(`${this.baseUrl}/albums/`, album, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  addPhoto(albumId: number, photo: Photo): Observable<Photo> {
    return this.client.post<Photo>(`${this.baseUrl}/albums/${albumId}/photo/`, photo, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
