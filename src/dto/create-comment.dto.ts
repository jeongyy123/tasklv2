import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsString()
  author: string;

  @IsNumber()
  password: number;
}
