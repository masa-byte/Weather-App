import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDbConnectionString } from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { FetchCityController } from './fetch-city/fetch-city.controller';
import { FetchCityService } from './fetch-city/fetch-city.service';
import { FetchWeatherController } from './fetch-weather/fetch-weather.controller';
import { FetchWeatherService } from './fetch-weather/fetch-weather.service';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDbConnectionString),
    CommentsModule
  ],
  controllers: [AppController, FetchWeatherController, FetchCityController],
  providers: [AppService, FetchWeatherService, FetchCityService],
})
export class AppModule {}
