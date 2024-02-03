import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { CommentsService } from '../../services/comments.service';
import { CommentInterface } from '../../types/comment.interface';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  comments: CommentInterface[] = [];
  activeComment: string | null = null;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.commentsService.getComments().subscribe((comments) => {
      this.comments = comments;
    });
  }

  setActiveComment(activeComment: string | null): void {
    this.activeComment = activeComment;
  }

  addComment({
    text,
    parentId,
  }: {
    text: string;
    parentId: string | null;
  }): void {
    this.commentsService
      .createComment(text, parentId)
      .pipe(switchMap(() => this.commentsService.getComments()))
      .subscribe((createdComments) => {
        //this.comments = [...this.comments, createdComment];
        this.comments = createdComments;
        this.activeComment = null;
      });
  }
}
