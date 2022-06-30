import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from '../core/requests.service';
import { Post } from '../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  posts: Post[] = []
  staticPosts: Post[] = []
  username = localStorage.getItem('username')
  constructor(private requests: RequestsService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      let id = this.route.snapshot.paramMap.get('id')
      this.requests.getPost(`${id}`).subscribe(res => {
        this.posts.length = 0
        this.posts.push(<Post>res)
      })
    } else {
      this.requests.getPosts().subscribe(res => {
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
