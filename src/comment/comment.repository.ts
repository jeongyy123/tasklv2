import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private dateSource: DataSource) {
    super(Comment, dateSource.createEntityManager());
  }
}
