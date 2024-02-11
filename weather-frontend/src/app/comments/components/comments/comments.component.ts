import { Component, Input, OnInit } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { CommentsService } from '../../comments.service';
import { CommentInterface } from '../../comment.model';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {

  @Input() cityName$: Observable<string> = new Observable<string>();
  public cityName: string = 'Nis';
  @Input() username$: Observable<string> = new Observable<string>();
  public username: string = 'Aleksa';

  comments: CommentInterface[] = [];
  activeComment: string | null = null;

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.cityName$
      .pipe(
        tap(cityName => this.cityName = cityName),
        switchMap(cityName => this.commentsService.getComments(cityName)),
      )
      .subscribe((comments) => {
        this.comments = comments;
      });

    this.username$.subscribe(username => this.username = username);
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
