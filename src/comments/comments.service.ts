import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CommentResponse, StoryResponse } from 'src/types';
import { Comment } from './comment.model';

@Injectable()
export class CommentsService {
  async getCommentsById(id: string): Promise<Comment[]> {
    const commentsArray: Comment[] = [];

    const response = await axios.get<StoryResponse>(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
    );

    for (const commentId of response.data.kids.slice(0, 10)) {
      const response = await axios.get<CommentResponse>(
        `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`,
      );
      commentsArray.push(this.createCommentModel(response.data));
    }

    commentsArray.sort(
      (a, b) => b.numberOfChildComments - a.numberOfChildComments,
    );

    return commentsArray;
  }
  createCommentModel(comment: CommentResponse): Comment {
    return {
      by: comment.by,
      text: comment.text,
      numberOfChildComments: comment.kids ? comment.kids.length : 0,
    };
  }
}
