import { Review } from 'src/review/review.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'board', name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int', name: 'commnetId' })
  commentId: number;

  @Column('varchar', { length: 100 })
  content: string;

  @Column('varchar', { length: 50 })
  author: string;

  @Column('int')
  password: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Review, (review) => review.comments)
  @JoinColumn({ name: 'reviewId', referencedColumnName: 'reviewId' })
  review: Review;
}
