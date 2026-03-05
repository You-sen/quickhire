import { IsString, IsNotEmpty, IsEmail, IsUrl, IsMongoId } from 'class-validator';

export class CreateApplicationDto {
  @IsMongoId()
  @IsNotEmpty()
  jobId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUrl()
  @IsNotEmpty()
  resumeLink: string;

  @IsString()
  @IsNotEmpty()
  coverNote: string;
}
