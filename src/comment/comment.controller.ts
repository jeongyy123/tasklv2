import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/dto/update-comment.dto';
import { DeleteCommentDto } from 'src/dto/delete-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:reviewId')
  createComment(
    @Param('reviewId') reviewId: number,
    @Body() data: CreateCommentDto,
  ) {
    return this.commentService.createComment(
      reviewId,
      data.content,
      data.author,
      data.password,
    );
  }

  @Get('/:reviewId')
  getCommentByReviewId(@Param('reviewId') reviewId: number) {
    return this.commentService.getCommentByReviewId(reviewId);
  }

  @Put('/:reviewId/:commentId')
  updateComment(@Param() paramData, @Body() bodyData: UpdateCommentDto) {
    return this.commentService.updateComment(
      paramData.reviewId,
      paramData.commentId,
      bodyData.content,
      bodyData.password,
    );
  }

  @Delete('/:reviewId/:commentId')
  deleteComment(@Param() paramData, @Body() bodyData: DeleteCommentDto) {
    return this.commentService.deleteComment(
      paramData.reviewId,
      paramData.commentId,
      bodyData.password,
    );
  }
}
