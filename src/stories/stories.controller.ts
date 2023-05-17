import { Controller, Get } from '@nestjs/common';
import { StoriesService } from './stories.service';

import { Story } from './story.entity';

@Controller()
export class StoriesController {
  constructor(private storiesService: StoriesService) {}

  @Get('/top-stories')
  async getTopStories(): Promise<Story[]> {
    return await this.storiesService.getTopStories();
  }

  @Get('/past-stories')
  async getPastStories(): Promise<Story[]> {
    return await this.storiesService.getPastStories();
  }
}
