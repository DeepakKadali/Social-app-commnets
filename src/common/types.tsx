export interface CommentItem {
  id: String;
  name: String;
  likes: string;
  items: Array<CommentItem>;
}
