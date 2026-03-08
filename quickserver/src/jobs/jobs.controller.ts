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
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Create a new job posting',
    description: 'Creates a new job posting with the provided details. All required fields must be provided.',
  })
  @ApiBody({ type: CreateJobDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Job created successfully',
    schema: {
      example: {
        success: true,
        message: 'Job created successfully',
        data: {
          _id: '507f1f77bcf86cd799439011',
          title: 'Senior Full Stack Developer',
          company: 'TechCorp Inc.',
          location: 'San Francisco, CA',
          category: 'Software Development',
          description: 'We are looking for an experienced Full Stack Developer...',
          type: 'Full-time',
          isActive: true,
          createdAt: '2024-01-15T10:30:00.000Z',
          updatedAt: '2024-01-15T10:30:00.000Z',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() createJobDto: CreateJobDto) {
    const job = await this.jobsService.create(createJobDto);
    return {
      success: true,
      message: 'Job created successfully',
      data: job,
    };
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all job postings',
    description: 'Retrieves all job postings with optional filtering by search term, category, and location.',
  })
  @ApiQuery({ name: 'search', required: false, description: 'Search term to filter jobs by title, company, or description' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter jobs by category' })
  @ApiQuery({ name: 'location', required: false, description: 'Filter jobs by location' })
  @ApiResponse({ 
    status: 200, 
    description: 'Jobs retrieved successfully',
    schema: {
      example: {
        success: true,
        count: 2,
        data: [
          {
            _id: '507f1f77bcf86cd799439011',
            title: 'Senior Full Stack Developer',
            company: 'TechCorp Inc.',
            location: 'San Francisco, CA',
            category: 'Software Development',
            type: 'Full-time',
            salary: '$120,000 - $150,000',
            isActive: true,
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
  @ApiOperation({ 
    summary: 'Get all job categories',
    description: 'Retrieves a list of all unique job categories available in the system.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Categories retrieved successfully',
    schema: {
      example: {
        success: true,
        count: 5,
        data: ['Software Development', 'Design', 'Marketing', 'Sales', 'Customer Support'],
      },
    },
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getCategories() {
    const categories = await this.jobsService.getCategories();
    return {
      success: true,
      count: categories.length,
      data: categories,
    };
  }

  @Get('locations')
  @ApiOperation({ 
    summary: 'Get all job locations',
    description: 'Retrieves a list of all unique job locations available in the system.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Locations retrieved successfully',
    schema: {
      example: {
        success: true,
        count: 3,
        data: ['San Francisco, CA', 'New York, NY', 'Remote'],
      },
    },
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getLocations() {
    const locations = await this.jobsService.getLocations();
    return {
      success: true,
      count: locations.length,
      data: locations,
    };
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a job by ID',
    description: 'Retrieves detailed information about a specific job posting by its ID.',
  })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId of the job', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Job retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          _id: '507f1f77bcf86cd799439011',
          title: 'Senior Full Stack Developer',
          company: 'TechCorp Inc.',
          location: 'San Francisco, CA',
          category: 'Software Development',
          description: 'We are looking for an experienced Full Stack Developer...',
          requirements: '5+ years of experience with React and Node.js',
          salary: '$120,000 - $150,000 per year',
          type: 'Full-time',
          isActive: true,
          createdAt: '2024-01-15T10:30:00.000Z',
          updatedAt: '2024-01-15T10:30:00.000Z',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Job not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: string) {
    const job = await this.jobsService.findOne(id);
    return {
      success: true,
      data: job,
    };
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Update a job posting',
    description: 'Updates an existing job posting with the provided details. Only provided fields will be updated.',
  })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId of the job', example: '507f1f77bcf86cd799439011' })
  @ApiBody({ type: UpdateJobDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Job updated successfully',
    schema: {
      example: {
        success: true,
        message: 'Job updated successfully',
        data: {
          _id: '507f1f77bcf86cd799439011',
          title: 'Senior Full Stack Developer',
          company: 'TechCorp Inc.',
          isActive: false,
          updatedAt: '2024-01-16T14:20:00.000Z',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
  @ApiOperation({ 
    summary: 'Delete a job posting',
    description: 'Permanently deletes a job posting from the system.',
  })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId of the job', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Job deleted successfully',
    schema: {
      example: {
        success: true,
        message: 'Job deleted successfully',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Job not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async remove(@Param('id') id: string) {
    await this.jobsService.remove(id);
    return {
      success: true,
      message: 'Job deleted successfully',
    };
  }
}
