import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createApplicationDto: CreateApplicationDto) {
    const application = await this.applicationsService.create(createApplicationDto);
    return {
      success: true,
      message: 'Application submitted successfully',
      data: application,
    };
  }

  @Get()
  async findAll(@Query('jobId') jobId?: string) {
    const applications = await this.applicationsService.findAll(jobId);
    return {
      success: true,
      count: applications.length,
      data: applications,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const application = await this.applicationsService.findOne(id);
    return {
      success: true,
      data: application,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.applicationsService.remove(id);
    return {
      success: true,
      message: 'Application deleted successfully',
    };
  }
}
