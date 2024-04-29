import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Review } from 'src/review/review.entity';
import { CommentRepository } from './comment.repository';
import { ReviewRepository } from 'src/review/review.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Review])],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, ReviewRepository],
})
export class CommentModule {}
