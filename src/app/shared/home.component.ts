import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../interfaces';
import { NoAuthRequestsService } from '../services/no-auth-requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  posts: Post[] = []
  staticPosts: Post[] = []
  username = localStorage.getItem('username')
  constructor(private noAuthRequests: NoAuthRequestsService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      let id = this.route.snapshot.paramMap.get('id')
      this.noAuthRequests.getPost(`${id}`).subscribe(res => {
        this.posts.length = 0
        this.posts.push(<Post>res)
      })
    } else {
      this.noAuthRequests.getPosts().subscribe(res => {
        this.staticPosts = <Post[]>res
        this.posts = <Post[]>res
      })
    }
  }
  handlePost(postId: number[]) {
    this.posts = this.staticPosts.filter(post => postId.includes(post.id))
  }
  onAuthStateChange(username: string) {
    this.username = username
  }
}
