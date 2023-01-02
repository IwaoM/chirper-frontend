export class Chirp {
  id!: number;
  timestamp!: Date;
  text!: string;
  image?: string;
  author_id!: number;
  reply_to_id?: number;
  username!: string;
  handle!: string;
  star_count!: number;
  reply_count!: number;
}