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
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDbConnectionString),
    CommentsModule
    AuthModule,
    CompanyModule,
    ProductModule,
    UserModule
  ],
  controllers: [AppController, FetchWeatherController, FetchCityController],
  providers: [
    AppService, 
    FetchWeatherService, 
    FetchCityService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }
