import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { ReviewRepository } from 'src/review/review.repository';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: CommentRepository,
    private reviewRepository: ReviewRepository,
  ) {}

  /* 댓글 등록 */
  async createComment(
    reviewId: number,
    content: string,
    author: string,
    password: number,
  ) {
    // await this.findReview(reviewId);

    // await this.commentRepository.save({ reviewId, content, author, password });

    const review = await this.findReview(reviewId);

    const comment = new Comment();
    comment.review = review; // review 엔터티를 설정합니다.
    comment.content = content;
    comment.author = author;
    comment.password = password;

    await this.commentRepository.save(comment);

    return '댓글을 등록하였습니다.';
  }

  /* 댓글 목록 조회 */
  async getCommentByReviewId(reviewId: number) {
    await this.findReview(reviewId);

    return await this.commentRepository.find({
      where: { review: { reviewId } }, //우째해야하나
    });
  }

  /* 댓글 수정 */
  async updateComment(
    reviewId: number,
    commentId: number,
    content: string,
    password: number,
  ) {
    await this.findReview(reviewId);

    await this.findComment(commentId, password);

    await this.commentRepository.update({ commentId, password }, { content });

    return '댓글을 수정하였습니다.';
  }

  /* 댓글 삭제 */
  async deleteComment(reviewId: number, commentId: number, password: number) {
    await this.findReview(reviewId);

    await this.findComment(commentId, password);

    await this.commentRepository.softDelete(commentId);

    return '댓글을 삭제했습니다.';
  }

  private async findReview(reviewId: number) {
    const review = await this.reviewRepository.findOne({
      where: { reviewId, deletedAt: null },
    });

    if (!review) {
      throw new NotFoundException(
        `해당 ${reviewId}를 가진 리뷰가 존재하지않습니다.`,
      );
    }
    return review;
  }

  private async findComment(commentId: number, password: number) {
    const comment = await this.commentRepository.findOne({
      where: { commentId, deletedAt: null },
      select: ['password'],
    });

    if (!comment) {
      throw new NotFoundException(
        `해당 ${commentId}를 가진 댓글이 존재하지않습니다.`,
      );
    }

    if (comment.password !== password) {
      throw new UnauthorizedException(`비밀번호가 맞지않습니다.`);
    }

    return comment;
  }
}
