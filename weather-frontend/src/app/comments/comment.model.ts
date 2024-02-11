export interface CommentInterface {
  _id: string;
  text: string;
  userId: string;
  username: string;
  createdAt: string;
  replies: CommentInterface[];
}
