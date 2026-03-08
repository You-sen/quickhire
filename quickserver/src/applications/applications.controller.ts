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
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Submit a job application',
    description: 'Creates a new job application for a specific job posting. Requires applicant details and resume link.',
  })
  @ApiBody({ type: CreateApplicationDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Application submitted successfully',
    schema: {
      example: {
        success: true,
        message: 'Application submitted successfully',
        data: {
          _id: '507f1f77bcf86cd799439012',
          jobId: '507f1f77bcf86cd799439011',
          name: 'John Doe',
          email: 'john.doe@example.com',
          resumeLink: 'https://storage.example.com/resumes/john-doe-resume.pdf',
          coverNote: 'I am excited to apply for this position...',
          status: 'pending',
          createdAt: '2024-01-15T11:00:00.000Z',
          updatedAt: '2024-01-15T11:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data or job not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() createApplicationDto: CreateApplicationDto) {
    const application = await this.applicationsService.create(createApplicationDto);
    return {
      success: true,
      message: 'Application submitted successfully',
      data: application,
    };
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all applications',
    description: 'Retrieves all job applications with optional filtering by job ID.',
  })
  @ApiQuery({ 
    name: 'jobId', 
    required: false, 
    description: 'Filter applications by job ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Applications retrieved successfully',
    schema: {
      example: {
        success: true,
        count: 2,
        data: [
          {
            _id: '507f1f77bcf86cd799439012',
            jobId: '507f1f77bcf86cd799439011',
            name: 'John Doe',
            email: 'john.doe@example.com',
            resumeLink: 'https://storage.example.com/resumes/john-doe-resume.pdf',
            status: 'pending',
            createdAt: '2024-01-15T11:00:00.000Z',
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll(@Query('jobId') jobId?: string) {
    const applications = await this.applicationsService.findAll(jobId);
    return {
      success: true,
      count: applications.length,
      data: applications,
    };
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get an application by ID',
    description: 'Retrieves detailed information about a specific job application by its ID.',
  })
  @ApiParam({ 
    name: 'id', 
    description: 'MongoDB ObjectId of the application', 
    example: '507f1f77bcf86cd799439012',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Application retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          _id: '507f1f77bcf86cd799439012',
          jobId: '507f1f77bcf86cd799439011',
          name: 'John Doe',
          email: 'john.doe@example.com',
          resumeLink: 'https://storage.example.com/resumes/john-doe-resume.pdf',
          coverNote: 'I am excited to apply for this position because...',
          status: 'pending',
          createdAt: '2024-01-15T11:00:00.000Z',
          updatedAt: '2024-01-15T11:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Application not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: string) {
    const application = await this.applicationsService.findOne(id);
    return {
      success: true,
      data: application,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Delete an application',
    description: 'Permanently deletes a job application from the system.',
  })
  @ApiParam({ 
    name: 'id', 
    description: 'MongoDB ObjectId of the application', 
    example: '507f1f77bcf86cd799439012',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Application deleted successfully',
    schema: {
      example: {
        success: true,
        message: 'Application deleted successfully',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Application not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async remove(@Param('id') id: string) {
    await this.applicationsService.remove(id);
    return {
      success: true,
      message: 'Application deleted successfully',
    };
  }
}
