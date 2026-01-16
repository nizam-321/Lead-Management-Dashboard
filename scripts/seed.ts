import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Lead } from '../src/models/Lead';


dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(' Error: MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

const STAGES = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
const SOURCES = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Event'];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!);
    console.log(' Connected successfully.');


    console.log('Cleaning existing leads...');
    await Lead.deleteMany({});

    console.log('Generating 500 professional leads...');
    const leads = [];

    for (let i = 0; i < 500; i++) {
      const createdAt = faker.date.past({ years: 1 }); 
      
      leads.push({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        company: faker.company.name(),
        phone: faker.phone.number(),
        stage: faker.helpers.arrayElement(STAGES),
        source: faker.helpers.arrayElement(SOURCES),
        value: faker.number.int({ min: 1000, max: 100000 }), 
        notes: faker.lorem.sentence(),
        createdAt: createdAt
      });
    }


    await Lead.insertMany(leads);
    console.log('Successfully seeded 500 leads to your database!');

    process.exit(0);
  } catch (error) {
    console.error(' Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();