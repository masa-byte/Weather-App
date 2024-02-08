import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/auth/decorators/metadata';
import { CommentEntity } from './comment.schema';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './create-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Public()
    @Get(':cityName')
    async fetchCityComments(
        @Param('cityName') cityName: string,
    ): Promise<CommentEntity[]> {
        return await this.commentsService.fetchCityComments(cityName);
    }

    @Public()
    @Post(':cityName')
    async create(
        @Param('cityName') cityName: string,
        @Body() createCommentDto: CreateCommentDto
    ): Promise<any> {
        return await this.commentsService.create(cityName, createCommentDto);
    }

    @Public()
    @Put(':cityName/:parentId')
    async reply(
        @Param('cityName') cityName: string,
        @Param('parentId') parentId: string,
        @Body() createCommentDto: CreateCommentDto
    ): Promise<any> {
        return await this.commentsService.reply(cityName, parentId, createCommentDto);
    }

    @Public()
    @Delete(':cityName/:parentId/:commentId')
    async delete(
        @Param('cityName') cityName: string,
        @Param('parentId') parentId: string,
        @Param('commentId') commentId: string
    ): Promise<any> {
        return await this.commentsService.delete(cityName, parentId, commentId);
    }
}
