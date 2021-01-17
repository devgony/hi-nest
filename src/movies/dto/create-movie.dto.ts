import { IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsString({ each: true }) // array? => each: true
  @IsOptional() // set a property optional like "?"
  readonly genres: string[];
}
