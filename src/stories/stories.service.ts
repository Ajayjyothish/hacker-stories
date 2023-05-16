import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Story } from './story.entity';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story) private storyRepository: Repository<Story>,
  ) {}

  async getTopStories() {
    const storiesArray = [];
    const response = await axios.get<number[]>(
      'https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty',
    );
    console.log(response.data);

    for (const storyId of response.data.slice(0, 10)) {
      const response = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`,
      );
      storiesArray.push(response.data);
    }
    console.log(storiesArray);
  }
}
