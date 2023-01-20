export class User {
  constructor (data?: User) {
    if (data) {
      Object.assign(this, data);
    } else {
      this.id = 0;
      this.email = "";
      this.username = "";
      this.handle = "";
      this.bio = "";
      this.theme_bg = 0;
      this.theme_accent = 0;
    }
  }

  id!: number;
  email!: string;
  username!: string;
  handle!: string;
  bio!: string;
  theme_bg!: number;
  theme_accent!: number;
}