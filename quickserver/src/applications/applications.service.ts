import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application, ApplicationDocument } from './schemas/application.schema';
import { CreateApplicationDto } from './dto/create-application.dto';
import { JobsService } from '../jobs/jobs.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name) private applicationModel: Model<ApplicationDocument>,
    private jobsService: JobsService,
  ) {}

  async create(createApplicationDto: CreateApplicationDto): Promise<Application> {
    // Verify job exists
    try {
      await this.jobsService.findOne(createApplicationDto.jobId);
    } catch (error) {
      throw new BadRequestException('Invalid job ID');
    }

    const createdApplication = new this.applicationModel(createApplicationDto);
    return createdApplication.save();
  }

  async findAll(jobId?: string): Promise<Application[]> {
    const filter = jobId ? { jobId } : {};
    return this.applicationModel
      .find(filter)
      .populate('jobId', 'title company location') // Only populate needed fields
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Application> {
    const application = await this.applicationModel
      .findById(id)
      .populate('jobId', 'title company location')
      .exec();
    
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }

  async findByJob(jobId: string): Promise<Application[]> {
    return this.applicationModel
      .find({ jobId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async remove(id: string): Promise<void> {
    const result = await this.applicationModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
  }
}
