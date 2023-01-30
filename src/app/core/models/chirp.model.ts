export class Chirp {
  id!: number;
  timestamp!: Date;
  text!: string;
  image!: boolean;
  author_id!: number;
  reply_to_id?: number;
  username!: string;
  handle!: string;
  pic_updated!: Date;
  star_count!: number;
  reply_count!: number;
}