export interface CommentInterface {
  id: string;
  body: string;
  username: string;
  createdAt: string;
  replies: CommentInterface[];
}
