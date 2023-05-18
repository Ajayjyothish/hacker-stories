export type CommentResponse = {
  id: number;
  parent: number;
  time: number;
  by: string;
  type: string;
  text: string;
  kids?: number[];
};

export type StoryResponse = {
  id: number;
  by: string;
  score: number;
  title: string;
  url: string;
  type: string;
  time: number;
  kids: number[];
};
