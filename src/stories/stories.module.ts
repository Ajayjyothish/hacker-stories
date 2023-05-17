import { Module } from '@nestjs/common';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './story.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Story]),
    CacheModule.register({ ttl: 15 * 60000 }),
  ],
  controllers: [StoriesController],
  providers: [StoriesService],
})
export class StoriesModule {}
