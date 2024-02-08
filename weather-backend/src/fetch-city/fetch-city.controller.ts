import { Controller, Get, Query } from '@nestjs/common';
import { FetchCityService } from './fetch-city.service';
import { Public } from 'src/auth/decorators/metadata';

@Controller('fetch-city')
export class FetchCityController {
    constructor(private readonly fetchCityService: FetchCityService) { }

    @Public()
    @Get()
    fetchCityParams(
        @Query('name') name: string
    ): Promise<any> {
        return this.fetchCityService.fetchCityParams(name);
    }
}
