import { PickType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';

export class DeleteReviewDto extends PickType(CreateReviewDto, [
  'password',
] as const) {}
