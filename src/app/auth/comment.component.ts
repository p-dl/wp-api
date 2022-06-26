import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {
  comment: string = ''
  /*  createForm: FormGroup
   constructor(private fb: FormBuilder) {
     this.createForm = this.fb.group({
       title: '',
       image: '',
       content: '',
       category: ''
     })
   } */
  ngOnInit(): void {


  }
  onCreate() {
    console.log("Not implemented")
  }

}
