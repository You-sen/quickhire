import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JobsService } from './jobs/jobs.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const jobsService = app.get(JobsService);

  const sampleJobs = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'Remote',
      category: 'Engineering',
      description: 'Looking for an experienced React developer',
      salary: '$100k - $150k',
      type: 'Full-time',
    },
    {
      title: 'Backend Engineer',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      category: 'Engineering',
      description: 'Node.js and MongoDB expert needed',
      salary: '$120k - $160k',
      type: 'Full-time',
    },
  ];

  for (const job of sampleJobs) {
    await jobsService.create(job);
  }

  console.log('✅ Seed data created successfully');
  await app.close();
}

seed();
