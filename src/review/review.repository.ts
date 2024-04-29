import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewRepository extends Repository<Review> {
  constructor(private dateSource: DataSource) {
    super(Review, dateSource.createEntityManager());
  }
}
