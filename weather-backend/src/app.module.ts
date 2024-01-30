import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FetchWeatherService } from './fetch-weather/fetch-weather.service';
import { mongoDbConnectionString } from 'config';
import { FetchWeatherController } from './fetch-weather/fetch-weather.controller';
import { FetchCityService } from './fetch-city/fetch-city.service';
import { FetchCityController } from './fetch-city/fetch-city.controller';

@Module({
  imports: [
    //MongooseModule.forRoot(mongoDbConnectionString),
  ],
  controllers: [AppController, FetchWeatherController, FetchCityController],
  providers: [AppService, FetchWeatherService, FetchCityService],
})
export class AppModule {}
