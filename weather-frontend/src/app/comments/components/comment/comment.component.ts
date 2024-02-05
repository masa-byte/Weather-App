import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentInterface } from '../../types/comment.interface';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {
  @Input() comment!: CommentInterface;
  @Input() activeComment!: string | null;
  @Input() parentId!: string | null;
  @Input() canReply: boolean = false;
  
  @Output()
  setActiveComment = new EventEmitter<string | null>();
  @Output()
  addComment = new EventEmitter<string>();

  createdAt: string = '';

  ngOnInit(): void {
    this.createdAt = new Date(this.comment.createdAt).toLocaleDateString();
  }

  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return this.activeComment === this.comment._id;
  }
}
