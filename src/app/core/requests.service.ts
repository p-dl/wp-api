import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author, Post, TokenInfo } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private http: HttpClient) { }
  offset: number = (new Date()).getTimezoneOffset()
  validateUser(formData: FormData): Observable<TokenInfo> {
    const url = environment.apiUrl + '/jwt-auth/v1/token'
    return this.http.post<TokenInfo>(url, formData)
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get(`${environment.apiUrl}/wp/v2/users?any=${Math.random()}`).pipe(
      map((res: any) => {
        let formatterUser = res.map((user: any) => {
          return {
            id: user.id,
            name: user.name
          }
        })
        return formatterUser
      })
    )
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
          viewOnWordpress: res.guid.rendered
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

  authorWise(query: string = ''): Observable<number[]> {
    return this.http.get(`${environment.apiUrl}/wp/v2/posts?author=${query}`).pipe(
      map((res: any) => {
        let postId: number[] = res.map((post: any) => {
          return post.id
        })
        return postId
      })
    )
  }

  getImageUrl(featured_media: number): Observable<string> {
    return this.http.get<any>(`${environment.apiUrl}/wp/v2/media/${featured_media}`)
      .pipe(map(res => res.guid.rendered))
  }
  uploadFeaturedMedia(photoData: FormData): Observable<any> {
    const url = `${environment.apiUrl}/wp/v2/media`
    return this.http.post(url, photoData)
  }
  updatePost(id: string | null, formData: FormData): Observable<any> {
    const url = `${environment.apiUrl}/wp/v2/posts/${id}`
    return this.http.post(url, formData)
  }
  createPost(formData: FormData): Observable<any> {
    const url = `${environment.apiUrl}/wp/v2/posts`
    return this.http.post(url, formData)
  }
  deletePost(id: string | null): Observable<any> {
    const url = `${environment.apiUrl}/wp/v2/posts/${id}`
    return this.http.delete(url)
  }
}