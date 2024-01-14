// meets.controller.ts

import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import {MeetsService} from './meets.service';
import {JwtAuthGuard} from "../guard/jwt-auth.guard";
import {CreateMeetDto} from "./meet.dto";

@Controller('meet')
export class MeetsController {
  constructor(private readonly meetsService: MeetsService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/create')

  async createMeet(@Req() req, @Body(new ValidationPipe()) createMeetDto: CreateMeetDto) {
    const userId = req.user.id;
    return await this.meetsService.createMeet(userId, createMeetDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllMeets(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<any> {
    const [meets, total, totalPages] = await this.meetsService.getAllMeets(page, limit);
    return {
      data: meets,
      pagination:{
        total,
        totalPages,
        currentPage: page,
      }
    };
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllMeetsByOrganization(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
      @Query('organizationId') organizationId: string,
  ) {
    if (!organizationId) {
      throw new BadRequestException('OrganizationId is required');
    }
      const [meets, total, totalPages] = await this.meetsService.getAllMeetsInOrganization(
          page,
          limit,
          organizationId,
      );
      return {
        data: meets,
        pagination:{
          total,
          totalPages,
          currentPage: Number(page),
        }
      };
  }
}
