import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { Comment } from './comment.model';
import { CommentResponse, StoryResponse } from 'src/types';

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsService],
    }).compile();

    service = module.get<CommentsService>(CommentsService);

    jest.spyOn(service, 'getStoryById').mockImplementation(getStoryById);
    jest
      .spyOn(service, 'getCommentsFromStoryKids')
      .mockImplementation(getCommentFromKids);
  });

  it('sort comments based on the number of child comments', async () => {
    expect(await service.getCommentsById(1)).toEqual(commmentResults);
  });
});

async function getStoryById(id: number): Promise<StoryResponse> {
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
  ];

  return storyResponse.find((story) => story.id === id);
}

async function getCommentFromKids(commentId: number): Promise<CommentResponse> {
  const comments: CommentResponse[] = [
    {
      by: 'ubj',
      id: 12,
      kids: [
        35967883, 35966705, 35967004, 35967929, 35966575, 35966322, 35966980,
        35966728, 35971104, 35966974, 35968646, 35971167, 35966985, 35967487,
        35966934, 35967215,
      ],
      parent: 35963936,
      text: 'I like this step towards greater rigor when working with LLM&#x27;s. But part of me can&#x27;t help but feel like this is essentially reinventing the concept of programming languages: formal and precise syntax to perform specific tasks with guarantees.<p>I wonder where the final balance will end up between the ease and flexibility of everyday language, and the precision &#x2F; guarantees of a formally specified language.',
      time: 1684262596,
      type: 'comment',
    },
    {
      by: 'simonw',
      id: 35965426,
      kids: [35965601, 35965532, 35967196, 35965495, 35967588, 35969516],
      parent: 35963936,
      text: 'This is pretty fascinating',
      time: 1684259980,
      type: 'comment',
    },
    {
      by: 'ryanklee',
      id: 13,
      kids: [35967074, 35966701, 35965704],
      parent: 35963936,
      text: 'I&#x27;m personally starting with learning Guidance and LMQL rather than LangChain just in order to get a better grasp of the behaviors that I&#x27;ve gathered LangChain papers over. Even after that, I&#x27;m likely to look at Haystack before LangChain.<p>Just getting the feeling that LangChain is going to end up being considered a kitchen sink solution full of anti patterns so might as well spend time a little lower level while I see which way the winds end up blowing.',
      time: 1684258183,
      type: 'comment',
    },
    {
      by: 'ntonozzi',
      id: 35964560,
      kids: [
        35964957, 35964772, 35965206, 35965369, 35964752, 35964894, 35965922,
      ],
      parent: 35963936,
      text: 'How does this work? I&#x27;ve seen a cool project about forcing Llama to output valid JSON: <a href="https:&#x2F;&#x2F;twitter.com&#x2F;GrantSlatton&#x2F;status&#x2F;1657559506069463040" rel="nofollow">https:&#x2F;&#x2F;twitter.com&#x2F;GrantSlatton&#x2F;status&#x2F;1657559506069463040</a>, but it doesn&#x27;t seem like it would be practical with remote LLMs like GPT. GPT only gives up to five tokens in the response if you use logprobs, and you&#x27;d have to use a ton of round trips.',
      time: 1684256062,
      type: 'comment',
    },
    {
      by: 'bjackman',
      id: 35966450,
      kids: [35966638],
      parent: 35963936,
      text: 'Wow I think there are details here I&#x27;m not fully understanding but this feels like a bit of a quantum leap* in terms of leveraging the strengths while avoiding the weaknesses of LLMs.<p>It seems like anything that provides access to the fuzzy &quot;intelligence&quot; in these systems while minimizing the cost to predictability and efficiency is really valuable.<p>I can&#x27;t quite put it into words but it seems like we are gonna be moving into a more hybrid model for lots of computing tasks in the next 3 years or so and I wonder if this is a huge peek at the kind of paradigms we&#x27;ll be seeing?<p>I feel so ignorant in such an exciting way at the moment! That tidbit about the problem solved by &quot;token healing&quot; is fascinating.<p>*I&#x27;m sure this isn&#x27;t as novel to people in the AI space but I haven&#x27;t seen anything like it before myself.',
      time: 1684264948,
      type: 'comment',
    },
    {
      by: 'ftxbro',
      id: 35965095,
      kids: [35965832],
      parent: 35963936,
      text: 'Will it still be all like &quot;As an AI language model I cannot ...&quot; or can this fix it? I mean asking to sexy roleplay as Yoda isn&#x27;t the same level as asking how to discreetly manufacture methamphetamine at industrial scale there are levels people',
      time: 1684258391,
      type: 'comment',
    },
    {
      by: 'indus',
      id: 35966122,
      kids: [35966712],
      parent: 35963936,
      text: 'This reminds me of the time when I wrote a cgi script.<p>Basically instructing the templating engine (a very crude regex) to replace session variables, database lookups to the merge fields:<p>Hello {{firstname}}!<p>1996 and 2023 smells alike.',
      time: 1684263532,
      type: 'comment',
    },
    {
      by: 'BeefySwain',
      id: 35969210,
      kids: [35969466],
      parent: 35963936,
      text: 'Using Mustache instead of Jinja for a Python package is a choice',
      time: 1684279932,
      type: 'comment',
    },
    {
      by: 'ahnick',
      id: 35964939,
      parent: 35963936,
      text: 'This strikes me as being very similar to Jargon (<a href="https:&#x2F;&#x2F;github.com&#x2F;jbrukh&#x2F;gpt-jargon">https:&#x2F;&#x2F;github.com&#x2F;jbrukh&#x2F;gpt-jargon</a>), but maybe more formal in its specification?',
      time: 1684257674,
      type: 'comment',
    },
    {
      by: 'EddieEngineers',
      id: 35966958,
      parent: 35963936,
      text: 'What&#x27;s with all these weird-looking projects with similar names using Guidance?<p><a href="https:&#x2F;&#x2F;github.com&#x2F;microsoft&#x2F;guidance&#x2F;network&#x2F;dependents">https:&#x2F;&#x2F;github.com&#x2F;microsoft&#x2F;guidance&#x2F;network&#x2F;dependents</a><p>They don&#x27;t even appear to be using Guidance anywhere anyway<p><a href="https:&#x2F;&#x2F;github.com&#x2F;IFIF3526&#x2F;aws-memo-server&#x2F;blob&#x2F;master&#x2F;requirements.txt">https:&#x2F;&#x2F;github.com&#x2F;IFIF3526&#x2F;aws-memo-server&#x2F;blob&#x2F;master&#x2F;requ...</a>',
      time: 1684267144,
      type: 'comment',
    },
  ];
  return comments.find((commment) => commment.id === commentId);
}

const commmentResults: Comment[] = [
  {
    by: 'ubj',
    text: 'I like this step towards greater rigor when working with LLM&#x27;s. But part of me can&#x27;t help but feel like this is essentially reinventing the concept of programming languages: formal and precise syntax to perform specific tasks with guarantees.<p>I wonder where the final balance will end up between the ease and flexibility of everyday language, and the precision &#x2F; guarantees of a formally specified language.',
    numberOfChildComments: 16,
  },
  {
    by: 'ryanklee',
    text: 'I&#x27;m personally starting with learning Guidance and LMQL rather than LangChain just in order to get a better grasp of the behaviors that I&#x27;ve gathered LangChain papers over. Even after that, I&#x27;m likely to look at Haystack before LangChain.<p>Just getting the feeling that LangChain is going to end up being considered a kitchen sink solution full of anti patterns so might as well spend time a little lower level while I see which way the winds end up blowing.',
    numberOfChildComments: 3,
  },
];
