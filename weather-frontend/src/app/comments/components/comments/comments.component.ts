import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { CommentInterface } from '../../types/comment.interface';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  @Input() cityName: string = 'Arilje';
  @Input() username: string = 'Aleksa';

  comments: CommentInterface[] = [];
  activeComment: string | null = null;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.commentsService.getComments(this.cityName).subscribe((comments) => {
      this.comments = comments;
    });
  }

  setActiveComment(activeComment: string | null): void {
    this.activeComment = activeComment;
  }

  addComment(text: string): void {
    this.commentsService.addComment(this.cityName, text, this.username)
    .subscribe((comments) => {
      this.comments = comments;
      this.activeComment = null;
    });
  }

  replyToComment(parentId: string, text: string): void {
    this.commentsService.replyToComment(this.cityName, parentId, text, this.username)
    .subscribe((comments) => {
      this.comments = comments;
      this.activeComment = null;
    });
  }

  deleteComment(comment4Delete: { parentId: string | null, commentId: string }): void {
    this.commentsService.deleteComment(this.cityName, comment4Delete.parentId, comment4Delete.commentId)
    .subscribe((comments) => {
      this.comments = comments;
      this.activeComment = null;
    });
  }
}