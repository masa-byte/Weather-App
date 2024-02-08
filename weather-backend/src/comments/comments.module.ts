import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CityEntity, CitySchema } from './city.schema';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: CityEntity.name, schema: CitySchema }]),
    ],
    controllers: [CommentsController],
    providers: [CommentsService],
})
export class CommentsModule {}
