import { IsNotEmpty } from 'class-validator';

export class CreateStoryDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  by: string;

  @IsNotEmpty()
  score: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  time: number;
}
