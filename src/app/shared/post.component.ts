import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  @Input() posts: Post[] = []
  @Input() username: string | null = ''

  constructor() {

  }

  ngOnInit(): void {

  }
}
