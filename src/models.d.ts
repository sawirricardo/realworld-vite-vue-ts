declare namespace App.Models {
  export interface User {
    username: string;
    bio: ?string;
    image: ?string;
    following: boolean;
    email?: string;
    token?: string;
  }

  export interface Article {
    title: string;
    slug: string;
    description: ?string;
    body: ?string;
    tagList: Array<string>;
    createdAt: string;
    updatedAt: string;
    author: App.Models.User;
    favorited: boolean;
    favoritesCount: number;
  }

  export interface Comment {
    id: number;
    body: string;
    author: App.Models.User;
    createdAt: string;
    updatedAt: string;
  }
}
