import * as dotenv from 'dotenv';
import path from 'path';
import type { Config } from 'drizzle-kit';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Parse the connection string to extract components
const parseConnectionString = (connString: string) => {
  const regex = /postgres:\/\/([^:]+)(:([^@]+))?@([^:]+):(\d+)\/(.+)/;
  const match = connString.match(regex);
  
  if (!match) {
    throw new Error('Invalid connection string format');
  }
  
  return {
    user: match[1] || 'postgres',
    password: match[3] || undefined,
    host: match[4] || 'localhost',
    port: parseInt(match[5] || '5432', 10),
    database: match[6] || 'app_db',
  };
};

const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/app_db';
const dbConfig = parseConnectionString(connectionString);

// Drizzle configuration
export default {
  schema: './src/backend/db/schema.ts',
  out: './src/backend/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  },
} satisfies Config; 