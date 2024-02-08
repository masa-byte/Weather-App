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
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDbConnectionString),
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
