import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {OrganizationService} from './organization.service';
import {JwtAuthGuard} from "../guard/jwt-auth.guard";
import {UpdateOrganizationDto} from "../dto/update-organization.dto";
import {AddUserDto} from "./oraganization.dto";

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationService: OrganizationService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async addUser(
      @Body('name') name: string,
      @Body('name') adminCode: string,
      @Body('name') userCode: string,
  )
  {
    const result = await this.organizationService.createOrganization(name, adminCode, userCode)
    return {
      msg: 'Organization successfully registered',
      result
    };
  }
  @Get('/all')
  async getAllOrganization(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
  ) {
    const [organizations, total] = await this.organizationService.getAllOrganization(page, limit);

    // @ts-ignore
    const totalPages = Math.ceil(total / limit);

    return {
      data:   organizations,
      pagination:{
        total,
        totalPages,
        currentPage: page,
      }

    };
  }
  @Put('/update')
  async updateOrganization(
      @Query('organizationId') organizationId: string,
      @Body(new ValidationPipe()) updateOrganizationDto: UpdateOrganizationDto,
  ) {
    const updatedOrganization = await this.organizationService.updateOrganization(organizationId, updateOrganizationDto);

    if (!updatedOrganization) {
      throw new NotFoundException('Organization not found');
    }

    return updatedOrganization;
  }
  @Delete('delete/:id')
  async deleteOrganization(@Param('id') organizationId: string) {
    const deletedOrganization = await this.organizationService.deleteOrganization(organizationId)

    if (!deletedOrganization) {
      throw new NotFoundException('Organization not found');
    }

    return { message: 'Organization deleted successfully' };
  }
  @Post('addUser')
  @UseGuards(JwtAuthGuard)
  async addUserToOrganization( @Req() req ,@Body(new ValidationPipe()) addUserDto: AddUserDto) {
    const userId = req.user.id;
    const organization = await this.organizationService.addUserToOrganization(addUserDto, userId);

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return organization;
  }
  @Get('byRole')
  @UseGuards(JwtAuthGuard)
  async getOrganizationsByRole(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
      @Query('role') role: 'owner' | 'user' = 'user',
      @Req() req
  ) {
    const userId = req.user.id;
    const [organizationsWithRole, total] = await this.organizationService.getOrganizationsByRole(page, limit, userId, role);

    const totalPages = Math.ceil(total / limit);

    return {
      data:   organizationsWithRole,
      pagination:{
        total,
        totalPages,
        currentPage: page,
      }

    };
  }
}
