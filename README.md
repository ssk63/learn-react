# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# PersonalVoice API

A complete backend API for managing personalized voice profiles with customizable settings for tone, audience targeting, and content generation preferences.

## Overview

This API provides a comprehensive solution for storing, retrieving, and managing PersonalVoice profiles. These profiles contain settings that can be used to customize AI-generated content according to specific voice characteristics, audience preferences, and fine-tuning parameters.

## Technologies Used

- **Backend**: Node.js with Express
- **Language**: TypeScript
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (containerized with Docker)
- **Development**: Hot reloading with tsx

## Features

- Full CRUD operations for PersonalVoice profiles
- Query by ID or custom key
- JSON storage for complex nested data
- Containerized database with Docker
- Type-safe API with TypeScript

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an `.env` file in the project root:
   ```
   DATABASE_URL=postgres://postgres@localhost:5432/personal_voice_db
   PORT=3001
   ```

4. Start the PostgreSQL database using Docker:
   ```bash
   docker-compose up -d
   ```

5. Generate database migrations:
   ```bash
   npm run db:generate
   ```

6. Run migrations:
   ```bash
   npm run db:migrate
   ```

7. Start the backend development server:
   ```bash
   npm run backend:dev
   ```

The API will be running at http://localhost:3001

## API Endpoints

### Personal Voices

| Method | Endpoint                       | Description                     |
|--------|--------------------------------|---------------------------------|
| GET    | /api/personal-voices           | Get all personal voices         |
| GET    | /api/personal-voices/id/:id    | Get a personal voice by ID      |
| GET    | /api/personal-voices/key/:key  | Get a personal voice by key     |
| POST   | /api/personal-voices           | Create a new personal voice     |
| PUT    | /api/personal-voices/:id       | Update a personal voice         |
| DELETE | /api/personal-voices/:id       | Delete a personal voice         |

## Request & Response Examples

### Get All Personal Voices

```
GET /api/personal-voices
```

Response:
```json
[
  {
    "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "key": "professional-writer",
    "name": "Professional Writer",
    "enabled": true,
    "profile": {
      "jobTitle": "Content Writer",
      "geographicalFocus": "Global",
      "skillsAndExpertise": ["Technical Writing", "Blog Posts", "Documentation"]
    },
    "toneOfVoice": {
      "writingSample": "Our solution provides enterprise-grade security while maintaining ease of use...",
      "toneOfVoiceAttributes": ["Professional", "Clear", "Authoritative"]
    },
    "audience": {
      "audienceDemographics": ["Technical Professionals", "Business Executives"]
    },
    "fineTuning": {
      "temperature": 0.7,
      "engagementStyle": "Informative",
      "useEmojis": false,
      "translate": false,
      "translateTo": ""
    },
    "createdAt": "2023-10-15T14:23:45.000Z",
    "updatedAt": "2023-10-15T14:23:45.000Z"
  }
]
```

### Create a Personal Voice

```
POST /api/personal-voices
```

Request Body:
```json
{
  "key": "friendly-support",
  "name": "Friendly Support Agent",
  "enabled": true,
  "profile": {
    "jobTitle": "Customer Support",
    "geographicalFocus": "US",
    "skillsAndExpertise": ["Problem Solving", "Technical Support", "Customer Service"]
  },
  "toneOfVoice": {
    "writingSample": "Hi there! I'm here to help you resolve this issue quickly. Let's look at some solutions...",
    "toneOfVoiceAttributes": ["Friendly", "Helpful", "Empathetic"]
  },
  "audience": {
    "audienceDemographics": ["General Consumers", "Non-Technical Users"]
  },
  "fineTuning": {
    "temperature": 0.8,
    "engagementStyle": "Conversational",
    "useEmojis": true,
    "translate": false,
    "translateTo": ""
  }
}
```

## Data Model

The PersonalVoice model includes:

```typescript
export interface PersonalVoiceModel {
  key: string;            // Unique identifier for the voice profile
  name: string;           // Display name for the voice profile
  enabled: boolean;       // Whether this voice profile is active
  
  // Professional background info
  profile: {
    jobTitle: string;
    geographicalFocus: string;
    skillsAndExpertise: string[];
  };
  
  // Writing style characteristics
  toneOfVoice: {
    writingSample: string;
    toneOfVoiceAttributes: string[];
  };
  
  // Target audience information
  audience: {
    audienceDemographics: string[];
  };
  
  // AI generation parameters
  fineTuning: {
    temperature: number;
    engagementStyle: string;
    useEmojis: boolean;
    translate: boolean;
    translateTo: string;
  };
}
```

## Database Structure

The database uses a hybrid approach:
- Main table with primary fields (key, name, enabled)
- JSON columns for nested objects (profile, toneOfVoice, audience, fineTuning)

This structure provides:
- Efficient querying of top-level properties
- Flexibility with complex nested objects
- Ability to use PostgreSQL's JSON query capabilities

## Docker Configuration

The included Docker setup provides a PostgreSQL database without authentication for development purposes:

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:16
    container_name: personal_voice_db
    environment:
      - POSTGRES_HOST_AUTH_METHOD=trust
      - POSTGRES_DB=personal_voice_db
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Development

### Available Scripts

- `npm run backend:dev` - Start the backend development server with hot reload
- `npm run db:generate` - Generate Drizzle ORM migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Launch Drizzle Studio for database browsing

### Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Port for the API server (defaults to 3001)

## Troubleshooting

### Database Connection Issues

If you encounter database connection problems:

1. Ensure Docker is running: `docker ps`
2. Check if PostgreSQL container is active: `docker ps | grep postgres`
3. Verify connection string in your `.env` file
4. Try connecting manually: `psql postgres://postgres@localhost:5432/personal_voice_db`

### Migration Errors

If migrations fail:

1. Check the database connection
2. Ensure the database exists: `createdb personal_voice_db`
3. Remove generated migrations and regenerate: `rm -rf src/backend/db/migrations/* && npm run db:generate`

## License

MIT
