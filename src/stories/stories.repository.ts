import { DataSource, Repository } from 'typeorm';
import { Story } from './story.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StoriesRepository extends Repository<Story> {
  constructor(private dataSource: DataSource) {
    super(Story, dataSource.createEntityManager());
  }
}
