import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentInterface } from '../types/comment.interface';

@Injectable()
export class CommentsService {
  private readonly baseURL = 'http://localhost:3000/comments';
  constructor(private httpClient: HttpClient) {}

  getComments(cityName: string): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>(
      `${this.baseURL}/${cityName}`
    );
  }

  addComment(
    cityName: string,
    text: string,
    username: string,
  ): Observable<CommentInterface[]> {
    return this.httpClient.post<CommentInterface[]>(
      `${this.baseURL}/${cityName}`,
      {
        text: text,
        createdAt: new Date().toISOString(),
        username: username,
      }
    );
  }

  replyToComment(
    cityName: string,
    commentId: string,
    text: string,
    username: string,
  ): Observable<CommentInterface[]> {
    return this.httpClient.put<CommentInterface[]>(
      `${this.baseURL}/${cityName}/${commentId}`,
      {
        text: text,
        createdAt: new Date().toISOString(),
        username: username,
      }
    );
  }

  deleteComment(
    cityName: string,
    parentId: string | null,
    commentId: string,
  ): Observable<CommentInterface[]> {
    return this.httpClient.delete<CommentInterface[]>(
      `${this.baseURL}/${cityName}/${parentId ? parentId : "unknown"}/${commentId}`
    );
  }
}
