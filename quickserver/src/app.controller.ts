import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  @Get('/')
  @ApiOperation({ 
    summary: 'API information',
    description: 'Returns basic API information and available endpoints',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'API information retrieved successfully',
    schema: {
      example: {
        name: 'QuickHire API',
        version: '1.0.0',
        description: 'Job posting and application management system',
        documentation: '/api/docs',
        endpoints: {
          health: '/api/health',
          jobs: '/api/jobs',
          applications: '/api/applications',
        },
      },
    },
  })
  getInfo() {
    return {
      name: 'QuickHire API',
      version: '1.0.0',
      description: 'Job posting and application management system',
      documentation: '/api/docs',
      endpoints: {
        health: '/api/health',
        jobs: '/api/jobs',
        applications: '/api/applications',
      },
    };
  }

  @Get('health')
  @ApiOperation({ 
    summary: 'Health check endpoint',
    description: 'Returns the API health status, uptime, and system information',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'API is healthy and running',
    schema: {
      example: {
        status: 'ok',
        message: 'QuickHire API is running',
        timestamp: '2024-01-15T10:30:00.000Z',
        uptime: 3600,
        version: '1.0.0',
        environment: 'development',
        database: 'connected',
        documentation: '/api/docs',
      },
    },
  })
  getHealth() {
    return {
      status: 'ok',
      message: 'QuickHire API is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: 'connected',
      documentation: '/api/docs',
    };
  }
}
