import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentInterface } from './comment.model';
import { url } from '../environment/environment';

@Injectable()
export class CommentsService {
  constructor(private httpClient: HttpClient) { }

  getComments(cityName: string): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>(
      url + "comments" + "/" + cityName
    );
  }

  addComment(
    cityName: string,
    text: string,
    username: string,
  ): Observable<CommentInterface[]> {
    return this.httpClient.post<CommentInterface[]>(
      url + "comments" + "/" + cityName,
      {
        text: text,
        createdAt: new Date().toISOString(),
        username: username ? username : 'Anonymous',
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
      url + "comments" + "/" + cityName + "/" + commentId,
      {
        text: text,
        createdAt: new Date().toISOString(),
        username: username ? username : 'Anonymous',
      }
    );
  }

  deleteComment(
    cityName: string,
    parentId: string | null,
    commentId: string,
  ): Observable<CommentInterface[]> {
    let tmp = parentId ? parentId : "unknown";
    return this.httpClient.delete<CommentInterface[]>(
      url + "comments" + "/" + cityName + "/" + tmp + "/" + commentId
    );
  }
}
