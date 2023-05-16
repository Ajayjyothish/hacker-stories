import { Controller, Get } from '@nestjs/common';
import { StoriesService } from './stories.service';

@Controller('stories')
export class StoriesController {
  constructor(private storiesService: StoriesService) {}

  @Get()
  getTopStories() {
    this.storiesService.getTopStories();
  }
}
