import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {
  comment: string = ''
  ngOnInit(): void {


  }
  onCreate() {
    console.log("Not implemented")
  }

}
