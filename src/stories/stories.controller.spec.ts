import { Test, TestingModule } from '@nestjs/testing';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';
import { Story } from './story.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Repository } from 'typeorm';
import { AppModule } from '../app.module';
import { StoryResponse } from 'src/types';

// jest.useFakeTimers();

describe('StoriesController', () => {
  let controller: StoriesController;
  let service: StoriesService;
  let story: Repository<Story>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<StoriesService>(StoriesService);
    controller = module.get<StoriesController>(StoriesController);
    story = module.get<Repository<Story>>(getRepositoryToken(Story));

    jest
      .spyOn(service, 'getTopStoriesIdList')
      .mockImplementation(getTopStoriesFromHackerNews);

    jest
      .spyOn(service, 'getStoryByStoryId')
      .mockImplementation(getStoryFromStoryId);
  });

  describe('getTopStories', () => {
    it('sort story list by score in descending order', async () => {
      expect(await controller.getTopStories()).toEqual(sortedDummyStories);
    });
    it('insert 2 stories to db, call Contoller.getTopStories, check count of stories in db is 10', async () => {
      const fakeStories = story.create(listOftwoFakeStory);
      await story.save(fakeStories);
      await controller.getTopStories();
      expect(await story.findOneBy({ id: 222 })).toBeNull;
    });
  });
});

async function getTopStoriesFromHackerNews(): Promise<number[]> {
  return [2, 5, 4, 3, 1, 6, 7, 9, 8, 10, 11, 21];
}

const listOftwoFakeStory: Story[] = [
  {
    id: 111,
    by: 'mooreds',
    score: 288,
    time: 1684337409,
    title:
      'Controlled burns help prevent wildfires; regulations make them nearly impossible',
    url: 'https://boulderbeat.news/2023/05/12/controlled-burn-rules/',
    isDisplayed: true,
  },
  {
    id: 222,
    by: 'thorin',
    score: 208,
    time: 1684324962,
    title: 'Retro Computer Museum',
    url: 'https://retrocomputermuseum.co.uk/',
    isDisplayed: true,
  },
];

const sortedDummyStories: Story[] = [
  {
    id: 1,
    by: 'mooreds',
    score: 288,
    time: 1684337409,
    title:
      'Controlled burns help prevent wildfires; regulations make them nearly impossible',
    url: 'https://boulderbeat.news/2023/05/12/controlled-burn-rules/',
    isDisplayed: true,
  },
  {
    id: 2,
    by: 'thorin',
    score: 208,
    time: 1684324962,
    title: 'Retro Computer Museum',
    url: 'https://retrocomputermuseum.co.uk/',
    isDisplayed: true,
  },
  {
    id: 3,
    by: '_sJiff',
    score: 176,
    time: 1684329528,
    title: "The Staff Engineer's Path – Book Review",
    url: 'https://smyachenkov.com/posts/book-review-the-staff-engineers-path/',
    isDisplayed: true,
  },
  {
    id: 4,
    by: 'jacooper',
    score: 132,
    time: 1684333311,
    title:
      'Stability AI Releases StableStudio, the Open-Source Future of DreamStudio',
    url: 'https://stability.ai/blog/stablestudio-open-source-community-driven-future-dreamstudio-release',
    isDisplayed: true,
  },
  {
    id: 5,
    by: 'CharlesW',
    score: 120,
    time: 1684332192,
    title:
      'Researchers treat depression by reversing brain signals traveling the wrong way',
    url: 'https://med.stanford.edu/news/all-news/2023/05/depression-reverse-brain-signals.html',
    isDisplayed: true,
  },
  {
    id: 6,
    by: 'mfrye0',
    score: 119,
    time: 1684338608,
    title: "World's largest open source company dataset",
    url: 'https://blog.bigpicture.io/introducing-the-worlds-largest-open-source-company-dataset/',
    isDisplayed: true,
  },
  {
    id: 7,
    by: 'erohead',
    score: 106,
    time: 1684336433,
    title: 'Show HN: Beepberry – a portable e-paper computer for hackers',
    url: 'https://beepberry.sqfmi.com/',
    isDisplayed: true,
  },
  {
    id: 8,
    by: 'dnetesn',
    score: 86,
    time: 1684334501,
    title: 'The Regenerating Power of Big Basin’s Redwoods',
    url: 'https://worldsensorium.com/the-regenerating-power-of-big-basins-redwoods/',
    isDisplayed: true,
  },
  {
    id: 9,
    by: 'shadeed',
    score: 52,
    time: 1684338039,
    title: 'Conditional CSS with:has and:nth-last-child',
    url: 'https://ishadeed.com/article/conditional-css-has-nth-last-child/',
    isDisplayed: true,
  },
  {
    id: 10,
    by: 'rbanffy',
    score: 38,
    time: 1684219770,
    title: 'Magic Pocket: Dropbox’s Exabyte-Scale Blob Storage System',
    url: 'https://www.infoq.com/articles/dropbox-magic-pocket-exabyte-storage/',
    isDisplayed: true,
  },
];

async function getStoryFromStoryId(id: number): Promise<StoryResponse> {
  const storyResponse = [
    {
      id: 1,
      by: 'mooreds',
      score: 288,
      title:
        'Controlled burns help prevent wildfires; regulations make them nearly impossible',
      url: 'https://boulderbeat.news/2023/05/12/controlled-burn-rules/',
      time: 1684337409,
      isDisplayed: true,
      type: 'story',
      kids: [12, 13],
    },
    {
      id: 11,
      by: 'mooreds',
      score: 288,
      title:
        'Controlled burns help prevent wildfires; regulations make them nearly impossible',
      url: 'https://boulderbeat.news/2023/05/12/controlled-burn-rules/',
      time: 1684337409,
      isDisplayed: true,
      type: 'job',
      kids: [12, 13],
    },
    {
      id: 21,
      by: 'mooreds',
      score: 288,
      title:
        'Controlled burns help prevent wildfires; regulations make them nearly impossible',
      url: 'https://boulderbeat.news/2023/05/12/controlled-burn-rules/',
      time: 1684337409,
      isDisplayed: true,
      type: 'ask',
      kids: [12, 13],
    },
    {
      id: 2,
      by: 'thorin',
      score: 208,
      title: 'Retro Computer Museum',
      url: 'https://retrocomputermuseum.co.uk/',
      time: 1684324962,
      isDisplayed: true,
      type: 'story',
      kids: [12, 13],
    },
    {
      id: 3,
      by: '_sJiff',
      score: 176,
      title: "The Staff Engineer's Path – Book Review",
      url: 'https://smyachenkov.com/posts/book-review-the-staff-engineers-path/',
      time: 1684329528,
      isDisplayed: true,
      type: 'story',
      kids: [12, 13],
    },
    {
      id: 4,
      by: 'jacooper',
      score: 132,
      title:
        'Stability AI Releases StableStudio, the Open-Source Future of DreamStudio',
      url: 'https://stability.ai/blog/stablestudio-open-source-community-driven-future-dreamstudio-release',
      time: 1684333311,
      isDisplayed: true,
      type: 'story',
      kids: [12, 13],
    },
    {
      id: 5,
      by: 'CharlesW',
      score: 120,
      title:
        'Researchers treat depression by reversing brain signals traveling the wrong way',
      url: 'https://med.stanford.edu/news/all-news/2023/05/depression-reverse-brain-signals.html',
      time: 1684332192,
      isDisplayed: true,
      type: 'story',
      kids: [12, 13],
    },
    {
      id: 6,
      by: 'mfrye0',
      score: 119,
      title: "World's largest open source company dataset",
      url: 'https://blog.bigpicture.io/introducing-the-worlds-largest-open-source-company-dataset/',
      time: 1684338608,
      isDisplayed: true,
      type: 'story',
      kids: [12, 13],
    },
    {
      id: 7,
      by: 'erohead',
      score: 106,
      title: 'Show HN: Beepberry – a portable e-paper computer for hackers',
      url: 'https://beepberry.sqfmi.com/',
      time: 1684336433,
      isDisplayed: true,
      type: 'story',
      kids: [12, 13],
    },
    {
      id: 8,
      by: 'dnetesn',
      score: 86,
      title: 'The Regenerating Power of Big Basin’s Redwoods',
      url: 'https://worldsensorium.com/the-regenerating-power-of-big-basins-redwoods/',
      time: 1684334501,
      isDisplayed: true,
      type: 'story',
      kids: [12, 13],
    },
    {
      id: 9,
      by: 'shadeed',
      score: 52,
      title: 'Conditional CSS with:has and:nth-last-child',
      url: 'https://ishadeed.com/article/conditional-css-has-nth-last-child/',
      time: 1684338039,
      isDisplayed: true,
      type: 'story',
      kids: [12, 13],
    },
    {
      id: 10,
      by: 'rbanffy',
      score: 38,
      title: 'Magic Pocket: Dropbox’s Exabyte-Scale Blob Storage System',
      url: 'https://www.infoq.com/articles/dropbox-magic-pocket-exabyte-storage/',
      time: 1684219770,
      isDisplayed: true,
      type: 'story',
      kids: [12, 13],
    },
  ];

  return storyResponse.find((story) => story.id === id);
}
