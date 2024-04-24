export interface Album {
  id: number;
  title: string;
}

export interface Photo {
  id: number;
  title: string;
  url: string;
  description: string;
  album_id: number;
}

export interface Category {
  id: number;
  name: string;
  photo: string;
}

export interface AllPhoto {
  id: number;
  title: string;
  description: string;
  photo: string;
  size: string;
  category: number;
}

export interface Pin {
  author: string;
  photo: any;
  size: string;
  title: string;
  description: string;
}

export interface User {
  id: number;
  username: string;
  // "password": string;
  banner: string;
  photo: string;
  email: string;
  desc: string;
  followers: number;
}

export interface TokenInfo {
  email: string;
  exp: number;
  user_id: number;
  username: string;
}

export interface AuthToken {
  token: string;
  access: string;
  refresh: string;
}
