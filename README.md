# hi-nest

Learning NestJS by making an enterprise ready API

npm i -g @nestjs/cli
nest new hi-nest

## Decorator

```
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
```

## Module

part of application
:auth, video,

### AppModule

root module of modules

## controllers

: router of express
take urls, maps it into and return services

### Decorator @Get

: route.get of express

- no space between function and decorator

## appService

: execute business logic (returned by controller)

- set contorllerName = serviceName as a convention (can be different)
