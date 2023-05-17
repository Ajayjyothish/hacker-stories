import { Controller, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.model';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}
  @Get('/:id')
  async getCommentsByStoryId(@Param('id') id: string): Promise<Comment[]> {
    return await this.commentsService.getCommentsById(id);
  }
}
