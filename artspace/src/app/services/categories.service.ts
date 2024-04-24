import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, AllPhoto } from '../models'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  baseURL = 'http://127.0.0.1:8000/api'

  constructor(private client: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.client.get<Category[]>(`${this.baseURL}/categories`);
  }

  getPhotos(id: number): Observable<AllPhoto[]> {
    return this.client.get<AllPhoto[]>(`${this.baseURL}/categories/${id}`);
  }
}
