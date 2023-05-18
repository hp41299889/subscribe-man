export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostUser {
  email: string;
  password: string;
  name: string;
}

export type CreateUserDto = PostUser;
