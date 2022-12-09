export class Chirp {
  id!: number;
  timestamp!: Date;
  text!: string;
  image?: string;
  author!: {
    id: number,
    username: string,
    handle: string,
    picture: string
  };
  starred!: boolean;
  starCount!: number;
  replyCount!: number;
  replyTo?: number;
  replyToUser?: number;
}