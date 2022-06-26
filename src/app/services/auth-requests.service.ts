import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestsService {
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
  constructor(private http: HttpClient, private router: Router) { }
  uploadFeaturedMedia(photoData: FormData): Observable<any> {
    const url = `${environment.apiUrl}/wp/v2/media`
    return this.http.post(url, photoData, { headers: this.headers })
  }
  updatePost(id: string | null, formData: FormData): Observable<any> {
    const url = `${environment.apiUrl}/wp/v2/posts/${id}`
    return this.http.post(url, formData, { headers: this.headers })
  }
  createPost(formData: FormData): Observable<any> {
    const url = `${environment.apiUrl}/wp/v2/posts`
    return this.http.post(url, formData, { headers: this.headers })
  }
  deletePost(id: string | null): Observable<any> {
    const url = `${environment.apiUrl}/wp/v2/posts/${id}`
    return this.http.delete(url, { headers: this.headers })
  }
}