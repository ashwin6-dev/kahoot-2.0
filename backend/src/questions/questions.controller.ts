import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';

@Controller('questions')
export class QuestionsController {
    @Post()
    saveQuestion(@Req() request: Request) {}
    
    @Get(":id")
    getQuestionById(@Param("id", ParseIntPipe) id: number) {} 

    @Put(":id")
    updateQuestion(@Param("id", ParseIntPipe) id: number) {}

    @Delete(":id")
    deleteQuestion(@Param("id", ParseIntPipe) id: number) {}

    @Get("search")
    getQuestionsByDesc(
        @Query("search") search: string, 
        @Query("limit", ParseIntPipe) limit: number,
        @Query("page", ParseIntPipe) page: number
    ) {}
}
