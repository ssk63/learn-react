import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const env = {
  database: {
    url: process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/app_db',
  },
  server: {
    port: parseInt(process.env.PORT || '3001', 10),
  }
}; 