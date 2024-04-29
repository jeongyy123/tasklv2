import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from 'src/dto/create-review.dto';
import { UpdateReviewDto } from 'src/dto/update-review.dto';
import { DeleteReviewDto } from 'src/dto/delete-review.dto ';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  createReview(@Body() data: CreateReviewDto) {
    return this.reviewService.createReview(
      data.bookTitle,
      data.title,
      data.content,
      data.starRating,
      data.author,
      data.password,
    );
  }

  @Get()
  getReviews() {
    return this.reviewService.getReviews();
  }

  @Get('/:reviewId')
  getReviewById(@Param('reviewId') reviewId: number) {
    return this.reviewService.getReviewById(reviewId);
  }

  @Put('/:reviewId')
  updateReview(
    @Param('reviewId') reviewId: number,
    @Body() data: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(
      reviewId,
      data.bookTitle,
      data.title,
      data.content,
      data.starRating,
      data.password,
    );
  }

  @Delete('/:reviewId')
  deleteReviewDto(
    @Param('reviewId') reviewId: number,
    @Body() data: DeleteReviewDto,
  ) {
    return this.reviewService.deleteReview(reviewId, data.password);
  }
}
