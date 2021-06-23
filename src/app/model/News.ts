import { Author } from './Author';
import { Comments } from './Comments';

export class News {
  id!: string;
  title!: string;
  subTitle!: string;
  description!: string;
  author!: Author;
  comments!: Comments;
}
