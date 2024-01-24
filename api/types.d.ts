export interface Board {
  id: string;
  author: string | null;
  message: string;
  image: string | null;
}

export type BoardWithoutId = Omit<Board, 'id'>;