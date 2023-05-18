import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CommentResponse, StoryResponse } from 'src/types';
import { Comment } from './comment.model';
import { BASE_URL } from '../constants';

@Injectable()
export class CommentsService {
  async getCommentsById(id: number): Promise<Comment[]> {
    const commentsArray: Comment[] = [];

    commentsArray.push(...(await this.getComments(id)));

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

  private async getComments(id: number): Promise<Comment[]> {
    const commentsList: Comment[] = [];
    const response = await this.getStoryById(id);
    for (const commentId of response.kids.slice(0, 10)) {
      const response = await this.getCommentsFromStoryKids(commentId);
      commentsList.push(this.createCommentModel(response));
    }
    return commentsList;
  }

  async getStoryById(id: number) {
    const response = await axios.get<StoryResponse>(
      `${BASE_URL}item/${id}.json?print=pretty`,
    );
    return response.data;
  }

  async getCommentsFromStoryKids(commentId: number) {
    const response = await axios.get<CommentResponse>(
      `${BASE_URL}item/${commentId}.json?print=pretty`,
    );
    return response.data;
  }
}
