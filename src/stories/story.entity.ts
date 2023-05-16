import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Story {
  @PrimaryColumn()
  id: number;

  @Column()
  by: string;

  @Column()
  score: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  time: number;
}
