import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post, TokenInfo } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoAuthRequestsService {
  offset: number = (new Date()).getTimezoneOffset()
  constructor(private http: HttpClient, private router: Router) {
  }
  validateUser(formData: FormData): Observable<TokenInfo> {
    const url = environment.apiUrl + '/jwt-auth/v1/token'
    return this.http.post<TokenInfo>(url, formData).pipe(finalize(() => this.router.navigateByUrl('/posts')))
  }
  getPosts(): Observable<Post[]> {
    return this.http.get(`${environment.apiUrl}/wp/v2/posts?_embed&any=${Math.random()}`).pipe(
      map((res: any) => {
        let formattedPost = res.map((post: any) => {
          let d = new Date(new Date(post.date_gmt).getTime() - this.offset * 60 * 1000);
          return {
            id: post.id,
            date: d,
            authorName: post._embedded.author[0].name,
            title: post.title.rendered,
            content: post.content.rendered,
            featured_media: post.featured_media,
            imageLink: post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : '',
            excerpt: post.excerpt.rendered,
            status: post.status,
            viewOnWordpress: post.guid.rendered,
            isFromSearch: false
          }
        })
        return formattedPost
      })
    )
  }
  getPost(param: string): Observable<Post> {
    return this.http.get(`${environment.apiUrl}/wp/v2/posts/${param}?_embed&any=${Math.random()}`).pipe(
      map((res: any) => {
        let d = new Date(new Date(res.date_gmt).getTime() - this.offset * 60 * 1000);
        return {
          id: res.id,
          date: d,
          author: res.author,
          authorName: res._embedded ? res._embedded.author[0].name : '',
          title: res.title.rendered,
          content: res.content.rendered,
          featured_media: res.featured_media,
          imageLink: res._embedded['wp:featuredmedia'] ? res._embedded['wp:featuredmedia'][0].source_url : '',
          excerpt: res.excerpt.rendered,
          status: res.status,
          viewOnWordpress: res.guid.rendered,
          isFromSearch: false
        }
      })
    )
  }
  searchInPosts(query: string = ''): Observable<number[]> {
    return this.http.get(`${environment.apiUrl}/wp/v2/search/?search=${query}&_embed&any=${Math.random()}`).pipe(
      map((res: any) => {
        let postId: number[] = res.map((post: any) => {
          return post.id
          /* {
            id: post.id,
            date: post._embedded.self[0].date,
            title: post.title,
            featured_media: post.featured_media,
            excerpt: post._embedded.self[0].excerpt.rendered,
            viewOnWordpress: post._embedded.self[0].link,
            isFromSearch: true
          } */
        })
        return postId;
      }),
    )
  }
  getImageUrl(featured_media: number): Observable<string> {
    return this.http.get<any>(`${environment.apiUrl}/wp/v2/media/${featured_media}`)
      .pipe(map(res => res.guid.rendered))
  }
}