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

> main.ts => app.module.ts => controller => appservice => return

## 3. Generate controller

```
nest g co
? What name would you like to use for the controller? movies
// => movies is the entry point
```

spec.ts is for test => delete it

> If you want something? Ask for it to nest! @Param()

> ## Summarize Decorators

@Query should be at earlier than @Param, otherwise it recognizes the entry point as Param first

```ts
@Get
@Post
@Delete
@Put
// Put update all resource
@Patch
// Patch update somepart
@Param
// get param from url(start wih ';')
@Query
// get query string from url(start with '?)
```

## 4. Generate provider(service)

Single-responsibility principle

: A thing should do one thing and well

```
nest g s
? What name would you like to use for the service? movies
```

> importing of express => asking in nest

```ts
// movies.controller.ts
constructor(private readonly moviesService: MoviesService) {}
```

service can be both of real or fake DB

## 5. built-in exception

```ts
// movies.service.ts
if (!movie) {
  throw new NotFoundException();
}
```

## 6. DTO: Data Transfer Object

1. better code experience
2. type validator(real time)

- typescript validate at only compile time

```
npm i class-validator class-transformer
```

> Create DTO

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

> Turn on ValidationPipe

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // if a property doesn't have validator, it will be striped off(ignored) and insert others
    forbidNonWhitelisted: true, // if a property doesn;t have validator, return error: "property title should not exist"
    transform: true, // convert string of url param to number
  }),
);
```

> ### PartialType

```
npm i @nestjs/mapped-types
```

```ts
// import CreateMovieDto and put "?" at each properties
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
```

## 7. Separate movie module from app module

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

```ts
// app.module.ts
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
```

```
nest g co
? What name would you like to use for the controller? app
mv src/app/app.controller.ts src/
rm -rf src/app/
```

```ts
// app.controller.ts
@Controller('') // "app" => ""
export class AppController {
  @Get()
  Home() {
    return 'Welcome to my Movie API';
  }
}
```

## 8. Dependency injection

Module.ts inject providers to controllers

```ts
// movies.module.ts
@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
```

And controllers will get by Type not by import

```ts
// movies.controller.ts
constructor(private readonly moviesService: MoviesService) {}
```

## 9. Express on NestJS

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

## 10. Unit Test in Nest

jest: javascript test package

`test:cov` => show all converage(%)

```
npm run test:cov
```

`test:watch` => unit test (each of function)
: each files named with \*`spec`\*

```
npm run test:watch
=> a
```

```ts
// movies/movies.service.spec.ts
describe('getAll', () => {
  it('should return an array', () => {
    const result = service.getAll();
    expect(result).toBeInstanceOf(Array);
  });
});
```

> Can define some work before or after

```ts
beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [MoviesService],
  }).compile();

  service = module.get<MoviesService>(MoviesService);
  // insert some data before each of test
});

afterAll(() => {
  console.log('afterAll: You may delete the test data here.');
});
```

## 11. End To End Test in Nest

`test:e2e` => end to end test (user story)
: at test folder

> Use beforeAll intead of beforeEach

> Cuz it create new app, add ValidationPipe same with prod app
