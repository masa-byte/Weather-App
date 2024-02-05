import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CityEntity } from './city.schema';
import { CommentEntity } from './comment.schema';
import { CreateCommentDto } from './create-comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(CityEntity.name) private cityModel: Model<CityEntity>
    ) {}

    async fetchCityComments(name: string): Promise<CommentEntity[]> {
        return (await this.cityModel.findOne({ name: name }).exec())?.comments || [];
    }

    async create(cityName: string, createCommentDto: CreateCommentDto): Promise<any> {
        const updateResponse = await this.cityModel.updateOne({ name: cityName }, { $push: { comments: {...createCommentDto, replies: []} } }).exec();
        if (updateResponse.acknowledged && updateResponse.upsertedId) {    
        }
        else {
            const createdCity = new this.cityModel({ name: cityName, comments: [{...createCommentDto, replies: []}] });
            await createdCity.save();
            //await this.cityModel.updateOne({ name: cityName }, { $push: { comments: {...createCommentDto, replies: []} } }).exec();
        }
        const city = await this.cityModel.findOne({ name: cityName }).exec();

        return city?.comments || [];
    }

    async reply(cityName: string, parentId: string, createCommentDto: CreateCommentDto): Promise<any> {
        await this.cityModel.updateOne({ name: cityName, 'comments._id': parentId }, { $push: { 'comments.$.replies': {...createCommentDto, replies: []} } }).exec();
        const city = await this.cityModel.findOne({ name: cityName }).exec();
        return city.comments;
    }
}
