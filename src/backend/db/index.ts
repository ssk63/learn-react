import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// Database connection string
const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/app_db';

// Create a postgres client
const client = postgres(connectionString);

// Create a drizzle ORM instance
export const db = drizzle(client, { schema });

export { schema }; 