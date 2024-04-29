import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepositoy: ReviewRepository,
  ) {}

  /* 리뷰 등록 */
  createReview(
    bookTitle: string,
    title: string,
    content: string,
    starRating: number,
    author: string,
    password: number,
  ) {
    this.reviewRepositoy.insert({
      bookTitle,
      title,
      content,
      starRating,
      author,
      password,
    });

    return '책 리뷰를 등록하였습니다.';
  }

  /* 리뷰 목록 조회 */
  getReviews() {
    return this.reviewRepositoy.find({
      where: { deletedAt: null },
      select: [
        'reviewId',
        'bookTitle',
        'title',
        'author',
        'starRating',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  /* 리뷰 상세 조회 */
  getReviewById(reviewId: number) {
    return this.reviewRepositoy.findOne({
      where: { reviewId, deletedAt: null },
      select: [
        'reviewId',
        'bookTitle',
        'title',
        'content',
        'author',
        'starRating',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  /* 리뷰 정보 수정 */
  async updateReview(
    reviewId: number,
    bookTitle: string,
    title: string,
    content: string,
    starRating: number,
    password: number,
  ) {
    await this.checkPassword(reviewId, password);

    await this.reviewRepositoy.update(reviewId, {
      bookTitle,
      title,
      content,
      starRating,
    });
    return '책 리뷰를 수정하였습니다.';
  }
  /* 리뷰 삭제 */
  async deleteReview(reviewId: number, password: number) {
    await this.checkPassword(reviewId, password);

    await this.reviewRepositoy.softDelete(reviewId);

    return '책리뷰를 삭제했습니다.';
  }

  private async checkPassword(reviewId: number, password: number) {
    const review = await this.reviewRepositoy.findOne({
      where: { reviewId, deletedAt: null },
      select: ['password'],
    });

    if (!review) {
      throw new NotFoundException(`해당 ${reviewId}를 가진 리뷰가 없습니다.`);
    }

    if (review.password !== password) {
      throw new UnauthorizedException(`비밀번호가 일치하지 않습니다.`);
    }
    return review;
  }
}
