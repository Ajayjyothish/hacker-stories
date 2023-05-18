import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Story } from './story.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { StoryResponse } from 'src/types';
import { StoriesRepository } from './stories.repository';
import { BASE_URL } from '../constants';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story) private storyRepository: StoriesRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getTopStories(): Promise<Story[]> {
    const topStories = await this.cacheManager.get<Story[]>('topStories');

    if (topStories != null) {
      return topStories;
    }

    const storiesEntityList: Story[] = [];
    const response = await this.getTopStoriesIdList();

    for (const storyId of response) {
      const response = await this.getStoryByStoryId(storyId);

      if (response.type === 'story' && response.url) {
        storiesEntityList.push(this.createStoryEntity(response));
      }
      if (storiesEntityList.length === 10) break;
    }

    this.saveAsPastStoriesToCache(); //save existing top stories to cache to display as past stories

    await this.storyRepository.update({}, { isDisplayed: false }); //set all existing db recods to isDisplayed = false

    storiesEntityList.sort((a, b) => b.score - a.score); //sort the array of stories in descending order of scores

    const stories: Story[] = this.storyRepository.create(storiesEntityList);

    this.cacheManager.set('topStories', stories); //save top stores to cache

    await this.storyRepository.save(stories);

    await this.storyRepository.delete({ isDisplayed: false }); //remove db records with isDisplayed = false

    return stories;
  }

  async getPastStories(): Promise<Story[]> {
    let pastStories = await this.cacheManager.get<Story[]>('pastStories');

    if (pastStories == null) {
      pastStories = await this.getDbStoriesOrderBy('desc');
    }
    return pastStories;
  }

  private createStoryEntity(story: StoryResponse): Story {
    return {
      id: story.id,
      by: story.by,
      score: story.score,
      time: story.time,
      title: story.title,
      url: story.url,
      isDisplayed: true,
    };
  }
  async getTopStoriesIdList() {
    const response = await axios.get<number[]>(
      `${BASE_URL}topstories.json?print=pretty`,
    );
    return response.data;
  }

  async getStoryByStoryId(storyId: number) {
    const response = await axios.get(
      `${BASE_URL}item/${storyId}.json?print=pretty`,
    );
    return response.data;
  }

  private async getDbStoriesOrderBy(order: 'asc' | 'desc'): Promise<Story[]> {
    return this.storyRepository.find({
      order: { score: { direction: order } },
    });
  }

  private async saveAsPastStoriesToCache(): Promise<void> {
    const pastStories = await this.getDbStoriesOrderBy('desc');
    this.cacheManager.set('pastStories', pastStories);
  }
}
