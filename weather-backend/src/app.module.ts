import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FetchWeatherService } from './fetch-weather/fetch-weather.service';
import { mongoDbConnectionString } from 'config';
import { FetchWeatherController } from './fetch-weather/fetch-weather.controller';
import { FetchCityService } from './fetch-city/fetch-city.service';
import { FetchCityController } from './fetch-city/fetch-city.controller';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDbConnectionString),
    CompanyModule,
    ProductModule,
    UserModule
  ],
  controllers: [AppController, FetchWeatherController, FetchCityController],
  providers: [AppService, FetchWeatherService, FetchCityService],
})
export class AppModule { }
