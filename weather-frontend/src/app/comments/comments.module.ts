import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './components/comment/comment.component';
import { CommentFormComponent } from './components/commentForm/commentForm.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentsService } from './comments.service';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  declarations: [CommentsComponent, CommentComponent, CommentFormComponent],
  providers: [CommentsService],
  exports: [CommentsComponent],
})
export class CommentsModule { }
