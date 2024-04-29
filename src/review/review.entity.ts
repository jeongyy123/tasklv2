import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';

@Entity({ schema: 'board', name: 'review' })
export class Review {
  @PrimaryGeneratedColumn({ type: 'int', name: 'reviewId' })
  reviewId: number;

  @Column('varchar', { length: 50 })
  bookTitle: string;

  @Column('varchar', { length: 50 })
  title: string;

  @Column('varchar', { length: 100 })
  content: string;

  @Column('int')
  starRating: number;

  @Column('varchar', { length: 10 })
  author: string;

  @Column('int')
  password: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Comment, (comment) => comment.review)
  comments: Comment[];
}
