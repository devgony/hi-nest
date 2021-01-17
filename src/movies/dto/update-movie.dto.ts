import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';
// import CreateMovieDto and put "?" at each properties
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
