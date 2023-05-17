export type CommentResponse = {
  by: string;
  text: string;
  kids: number[];
};

export type StoryResponse = {
  id: number;
  by: string;
  score: number;
  title: string;
  url: string;
  time: number;
  kids: number[];
};
