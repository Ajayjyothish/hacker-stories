import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Story } from './story.entity';

type StoryResponse = {
  id: number;
  by: string;
  score: number;
  title: string;
  url: string;
  time: number;
};

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story) private storyRepository: Repository<Story>,
  ) {}

  async getTopStories(): Promise<Story[]> {
    const storiesArray: StoryResponse[] = [];
    const response = await axios.get<number[]>(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
    );

    for (const storyId of response.data.slice(0, 2)) {
      const response = await axios.get<StoryResponse>(
        `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`,
      );
      storiesArray.push(response.data);
    }

    await this.storyRepository.update({}, { isDisplayed: false });

    const storiesEntityList = storiesArray.map<Story>((story) => ({
      id: story.id,
      by: story.by,
      score: story.score,
      time: story.time,
      title: story.title,
      url: story.url ?? 'www.xyz.com',
      isDisplayed: true,
    }));
    console.log(storiesEntityList);

    await this.storyRepository.delete({ isDisplayed: false });

    const stories = this.storyRepository.create(storiesEntityList);
    return await this.storyRepository.save(stories);
  }
}
