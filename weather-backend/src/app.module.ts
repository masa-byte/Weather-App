import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDbConnectionString } from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { CommentsModule } from './comments/comments.module';
import { CompanyModule } from './company/company.module';
import { FetchCityController } from './fetch-city/fetch-city.controller';
import { FetchCityService } from './fetch-city/fetch-city.service';
import { FetchWeatherController } from './fetch-weather/fetch-weather.controller';
import { FetchWeatherService } from './fetch-weather/fetch-weather.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDbConnectionString),
    CommentsModule,
    AuthModule,
    CompanyModule,
    ProductModule,
    UserModule,
    OrderModule
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
