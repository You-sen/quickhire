import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateJobDto {
  @ApiPropertyOptional({
    description: 'Job title',
    example: 'Senior Full Stack Developer',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Company name',
    example: 'TechCorp Inc.',
  })
  @IsString()
  @IsOptional()
  company?: string;

  @ApiPropertyOptional({
    description: 'Job location',
    example: 'San Francisco, CA',
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    description: 'Job category',
    example: 'Software Development',
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({
    description: 'Detailed job description',
    example: 'We are looking for an experienced Full Stack Developer...',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Job requirements and qualifications',
    example: '5+ years of experience with React and Node.js',
  })
  @IsString()
  @IsOptional()
  requirements?: string;

  @ApiPropertyOptional({
    description: 'Salary range or compensation details',
    example: '$120,000 - $150,000 per year',
  })
  @IsString()
  @IsOptional()
  salary?: string;

  @ApiPropertyOptional({
    description: 'Employment type',
    example: 'Full-time',
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({
    description: 'Whether the job posting is active',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
