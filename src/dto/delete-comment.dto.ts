import { PickType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';

export class DeleteCommentDto extends PickType(CreateCommentDto, [
  'password',
] as const) {}
