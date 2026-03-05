import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createJobDto: CreateJobDto) {
    const job = await this.jobsService.create(createJobDto);
    return {
      success: true,
      message: 'Job created successfully',
      data: job,
    };
  }

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('location') location?: string,
  ) {
    const jobs = await this.jobsService.findAll({ search, category, location });
    return {
      success: true,
      count: jobs.length,
      data: jobs,
    };
  }

  @Get('categories')
  async getCategories() {
    const categories = await this.jobsService.getCategories();
    return {
      success: true,
      count: categories.length,
      data: categories,
    };
  }

  @Get('locations')
  async getLocations() {
    const locations = await this.jobsService.getLocations();
    return {
      success: true,
      count: locations.length,
      data: locations,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const job = await this.jobsService.findOne(id);
    return {
      success: true,
      data: job,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    const job = await this.jobsService.update(id, updateJobDto);
    return {
      success: true,
      message: 'Job updated successfully',
      data: job,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.jobsService.remove(id);
    return {
      success: true,
      message: 'Job deleted successfully',
    };
  }
}
