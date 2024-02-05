export interface CommentInterface {
  _id: string;
  text: string;
  username: string;
  createdAt: string;
  replies: CommentInterface[];
}
