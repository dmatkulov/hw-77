export interface Board {
  id: string;
  author: string;
  message: string;
  image: string | null;
}

export interface BoardMutation {
  author: string | null;
  message: string;
  image: File | null;
}