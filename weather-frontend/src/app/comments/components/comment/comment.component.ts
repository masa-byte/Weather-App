import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentInterface } from '../../comment.model';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {
  @Input() comment!: CommentInterface;
  @Input() activeComment!: string | null;
  @Input() parentId!: string | null;
  @Input() canReply: boolean = false;
  @Input() username!: string;

  @Output()
  setActiveComment = new EventEmitter<string | null>();
  @Output()
  addComment = new EventEmitter<string>();
  @Output()
  deleteComment = new EventEmitter<{ parentId: string | null, commentId: string }>();

  createdAt: string = '';
  canDelete: boolean = false;

  ngOnInit(): void {
    this.createdAt = new Date(this.comment.createdAt).toLocaleDateString();
    this.canDelete =
      this.username === this.comment.username &&
      this.comment.replies.length === 0;
  }

  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return this.activeComment === this.comment._id;
  }
}
