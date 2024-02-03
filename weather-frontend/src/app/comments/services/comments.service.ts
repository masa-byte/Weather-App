import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommentInterface } from '../types/comment.interface';

@Injectable()
export class CommentsService {
  constructor(private httpClient: HttpClient) {}

  getComments(): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>(
      'http://localhost:3001/comments'
    );
  }

  createComment(
    text: string,
    parentId: string | null = null
  ): Observable<CommentInterface> {
    // return this.httpClient.post<CommentInterface>(
    //   `http://localhost:3001/comments/${parentId}/replies`,
    //   {
    //     body: text,
    //     // Should not be set here
    //     createdAt: new Date().toISOString(),
    //     username: 'Aleksa',
    //     replies: [],
    //   }
    // );
    const x: CommentInterface = {
      id: '123',
      body: text,
      createdAt: new Date().toISOString(),
      username: 'Aleksa',
      replies: [],
    };
    console.log(x);
    return of(x);
  }
}
