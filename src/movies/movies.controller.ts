import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies') // movies is the entry point
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  // getAll(@Req() req, @Res() res): Movie[] {
  // req, res does't work with e2e test
  getAll(): Movie[] {
    // return res.json(this.moviesService.getAll());
    return this.moviesService.getAll();
  }

  // @Query should be at earlier than @Param, otherwise it recognizes the entry point as Param first
  @Get('search')
  searchByYear(@Query('year') searchingYear: string) {
    return `you are searching for : ${searchingYear}`;
  }

  @Get(':id') // no need '/'
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  //Put update all resource
  //Patch update somepart
  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
