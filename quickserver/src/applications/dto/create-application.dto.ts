import { IsString, IsNotEmpty, IsEmail, IsUrl, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({
    description: 'MongoDB ObjectId of the job being applied to',
    example: '507f1f77bcf86cd799439011',
    pattern: '^[0-9a-fA-F]{24}$',
  })
  @IsMongoId()
  @IsNotEmpty()
  jobId: string;

  @ApiProperty({
    description: 'Applicant full name',
    example: 'John Doe',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Applicant email address',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'URL to applicant resume (PDF, DOC, or DOCX)',
    example: 'https://storage.example.com/resumes/john-doe-resume.pdf',
    format: 'uri',
  })
  @IsUrl()
  @IsNotEmpty()
  resumeLink: string;

  @ApiProperty({
    description: 'Cover letter or note from the applicant',
    example: 'I am excited to apply for this position because...',
    minLength: 50,
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  coverNote: string;
}
