# hi-nest

Learning NestJS by making an enterprise ready API

## 0. Installation

```
npm i -g @nestjs/cli
nest new hi-nest
```

## 1. Terminology

> ### Decorator @

: add special function to class

```ts
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// Decorator @Module add function to AppModule class
```

> ### Module

part of application
:auth, video...

- AppModule: root module of modules

> ### controllers

: route of express
take urls, maps it into and return services

> ### Decorator @Get

: route.get of express

- no line feed is allowed between function and decorator

> ### appService

: execute business logic (returned by controller)

- set contorllerName = serviceName as a convention (can be different)

## 2. process

main.ts => app.module.ts => controller => appservice => return

## 3. Generate controller

```
nest g co
? What name would you like to use for the controller? movies
// => movies is the entry point
```

spec.ts is for test => delete it

## . If you want something? Ask for it to nest! @Param()

## . Summarize Decorators

@Query should be at earlier than @Param, otherwise it recognizes the entry point as Param first

Put update all resource

Patch update somepart

## . Generate provider(service)

Single-responsibility principle

:A thing should do one thing and well

```
nest g s
? What name would you like to use for the service? movies
```

> importing of express => asking in nest

```ts
constructor(private readonly moviesService: MoviesService) {}
```

service can be both of real or fake DB

## built-in exception

```ts
if (!movie) {
  throw new NotFoundException();
}
```

## DTO: Data Transfer Object

1. better code experience
2. type validator(real time)

- typescript validate at only compile time

```
npm i class-validator class-transformer
```

```ts
// create-movie.dto.ts
export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsString({ each: true }) // array? => each: true
  @IsOptional() // set a property optional like "?"
  readonly genres: string[];
}
```

turn on ValidationPipe

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // if a property doesn't have validator, it will be striped off(ignored) and insert others
    forbidNonWhitelisted: true, // if a property doesn;t have validator, return error: "property title should not exist"
    transform: true, // convert string of url param to number
  }),
);
```

## PartialType

```
npm i @nestjs/mapped-types
```

```ts
// import CreateMovieDto and put "?" at each properties
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
```

## Separate movie module from app module

```
nest g mo
? What name would you like to use for the module? movies
```

```ts
// movies/movies.service.ts
@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
```

```
nest g co
? What name would you like to use for the controller? app
mv src/app/app.controller.ts src/
rm -rf src/app/
```

```ts
// app,controller.ts
@Controller('') // "app" => ""
export class AppController {
  @Get()
  Home() {
    return 'Welcome to my Movie API';
  }
}
```

## Dependency injection

Module.ts inject providers to controllers

```ts
@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
```

And controllers will get by Type not by import

```ts
constructor(private readonly moviesService: MoviesService) {}
```

## Express on NestJS

We can access to express by @Req(), @Res() decorators.
But Use it only `test purpose`.
Just in case we switch from Express to Fastify to increase speed twice, Don't use it for service
(NestJS runs on both of Express and Fastify)

```ts
@Get()
  getAll(@Req() req, @Res() res): Movie[] {
    return res.json(this.moviesService.getAll());
  }
```

## Testing in Nest

jest: javascript test package

```
npm run test:cov
```

test:cov => show all converage
test:watch => unit test (each of function)
test:e2e => end to end test (user story)
