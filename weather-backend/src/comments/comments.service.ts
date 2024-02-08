import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv6 } from 'uuid';
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
        }
        const city = await this.cityModel.findOne({ name: cityName }).exec();

        return city?.comments || [];
    }

    async reply(cityName: string, parentId: string, createCommentDto: CreateCommentDto): Promise<any> {
        await this.cityModel.updateOne({ name: cityName, 'comments._id': parentId }, { $push: { 'comments.$.replies': {...createCommentDto, replies: [], _id: uuidv6() } } }).exec();
        const city = await this.cityModel.findOne({ name: cityName }).exec();
        return city.comments;
    }

    async delete(cityName: string, parentId: string, commentId: string): Promise<any> {
        if (parentId === 'unknown') {
            await this.cityModel.updateOne({ name: cityName }, { $pull: { comments: { _id: commentId } } }).exec();
        }
        else {
            const comments = await this.cityModel.findOne({ name: cityName, 'comments._id': parentId }, { 'comments.$': 1 }).exec();
            const filderedReplies = comments.comments[0].replies.filter((reply: any) => reply._id !== commentId);
            await this.cityModel.updateOne({ name: cityName, 'comments._id': parentId }, { $set: { 'comments.$.replies': filderedReplies } }).exec();            
        }
        const city = await this.cityModel.findOne({ name: cityName }).exec();
        return city.comments;
    }
}
