import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoAuthRequestsService } from '../services/no-auth-requests.service';
import { AuthRequestsService } from '../services/auth-requests.service'
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styles: ['img { max-width: 100%; width: 100%; }']
})
export class CreatePostComponent implements OnInit {
  imageUrl = ''
  createForm!: FormGroup
  photoData = new FormData
  isEdit: boolean = false
  page = "Create"
  id: string | null = ''
  constructor(private noAuthRequestsService: NoAuthRequestsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authRequestsService: AuthRequestsService) {
    this.createForm = this.fb.group({
      title: '',
      featured_media: 0,
      content: '',
      status: 'draft',
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    !!this.id && this.editPage();
  }

  onFileChange(ev: any): void {
    this.photoData.append('file', ev.target.files[0])
    this.authRequestsService.uploadFeaturedMedia(this.photoData)
      .subscribe(res => {
        this.imageUrl = res.guid.rendered
        this.createForm.patchValue({ featured_media: res.id })
      })
  }
  editPage() {
    this.isEdit = true
    this.page = "Edit"
    this.noAuthRequestsService.getPost(`${this.id}`).subscribe(res => {
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
    this.authRequestsService.updatePost(this.id, this.createForm.value)
      .subscribe({
        next: res => this.router.navigateByUrl('/posts')
      })
  }
  handleCreate() {
    console.log("this.createform.value=", this.createForm.value)
    this.authRequestsService.createPost(this.createForm.value)
      .subscribe({
        next: res => this.router.navigateByUrl('/posts')
      })
  }
  handleDelete() {
    this.authRequestsService.deletePost(this.id)
      .subscribe({
        next: res => this.router.navigateByUrl('/posts')   // handle error for forbidden 403
      })
  }
}
