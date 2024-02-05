import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommentEntity } from './comment.schema';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './create-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Get(':cityName')
    async fetchCityComments(
        @Param('cityName') cityName: string,
    ): Promise<CommentEntity[]> {
        return await this.commentsService.fetchCityComments(cityName);
    }

    @Post(':cityName')
    async create(
        @Param('cityName') cityName: string,
        @Body() createCommentDto: CreateCommentDto
    ): Promise<any> {
        return await this.commentsService.create(cityName, createCommentDto);
    }

    @Put(':cityName/:parentId')
    async reply(
        @Param('cityName') cityName: string,
        @Param('parentId') parentId: string,
        @Body() createCommentDto: CreateCommentDto
    ): Promise<any> {
        return await this.commentsService.reply(cityName, parentId, createCommentDto);
    }

}
