const fs = require('fs');
const path = require('path');

// Read the all-jobs.json file
const jobsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/all-jobs.json'), 'utf8')
);

const API_URL = 'http://localhost:3001/api/jobs';

async function seedJobs() {
  console.log('Starting to seed jobs...');
  console.log(`Found ${jobsData.length} jobs to import`);

  let successCount = 0;
  let errorCount = 0;

  for (const job of jobsData) {
    try {
      // Remove _id field as MongoDB will generate new ones
      const { _id, ...jobData } = job;
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      const result = await response.json();

      if (result.success) {
        successCount++;
        console.log(`✓ Created: ${job.title} at ${job.company}`);
      } else {
        errorCount++;
        console.error(`✗ Failed: ${job.title} - ${result.message}`);
      }
    } catch (error) {
      errorCount++;
      console.error(`✗ Error creating ${job.title}:`, error.message);
    }
  }

  console.log('\n=== Seeding Complete ===');
  console.log(`✓ Successfully created: ${successCount} jobs`);
  console.log(`✗ Failed: ${errorCount} jobs`);
  console.log(`Total: ${jobsData.length} jobs`);
}

// Run the seed function
seedJobs().catch(console.error);
