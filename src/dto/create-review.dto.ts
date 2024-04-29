import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  bookTitle: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  starRating: number;

  @IsString()
  author: string;

  @IsNumber()
  password: number;
}
