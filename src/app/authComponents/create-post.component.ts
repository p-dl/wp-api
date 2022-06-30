import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsService } from '../core/requests.service'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent implements OnInit {
  photoValidation: boolean = true
  imageUrl = ''
  createForm!: FormGroup
  photoData = new FormData
  isEdit: boolean = false
  page = "Create"
  id: string | null = ''
  constructor(private requests: RequestsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      featured_media: 0,
      content: ['', Validators.required],
      status: 'draft',
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    !!this.id && this.editPage();
  }

  onFileChange(ev: any): void {
    this.photoData.append('file', ev.target.files[0])
    this.photoValidation = ev.target.files[0].type.split('/')[0] === 'image' ? true : false
    this.requests.uploadFeaturedMedia(this.photoData)
      .subscribe(res => {
        this.imageUrl = res.guid.rendered
        this.createForm.patchValue({ featured_media: res.id })
      })
  }
  editPage() {
    this.isEdit = true
    this.page = "Edit"
    this.requests.getPost(`${this.id}`).subscribe(res => {
      this.imageUrl = res.imageLink
      this.createForm.patchValue({
        title: res.title,
        content: res.content,
        status: res.status,
        featured_media: res.featured_media,
      })
    })
  }
  handleUpdate() {
    this.createForm.valid && this.requests.updatePost(this.id, this.createForm.value)
      .subscribe({
        next: res => this.router.navigateByUrl('/posts')
      })
  }
  handleCreate() {
    this.createForm.valid && this.requests.createPost(this.createForm.value)
      .subscribe({
        next: res => this.router.navigateByUrl('/posts')
      })
  }
  handleDelete() {
    this.requests.deletePost(this.id)
      .subscribe({
        next: res => this.router.navigateByUrl('/posts')
      })
  }
}
