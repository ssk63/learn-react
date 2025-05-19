# PersonalVoice API - MVC Architecture

This backend is structured according to modular MVC (Model-View-Controller) architecture principles to ensure separation of concerns, maintainability, and scalability.

## Project Structure

```
src/backend/
├── config/              # Configuration files
│   ├── database.ts      # Database connection configuration
│   └── environment.ts   # Environment variables management
│
├── models/              # Data models & database interactions
│   ├── index.ts         # Export all models
│   ├── schema.ts        # Database schema definitions
│   └── personalVoice.model.ts  # Model business logic
│
├── controllers/         # Request handlers
│   ├── index.ts         # Export all controllers
│   └── personalVoice.controller.ts
│
├── services/            # Business logic layer
│   ├── index.ts         # Export all services
│   └── personalVoice.service.ts
│
├── routes/              # API routes
│   ├── index.ts         # Combine all routes
│   └── personalVoice.routes.ts
│
├── middleware/          # Custom middleware
│   ├── error.middleware.ts     # Error handling
│   └── validation.middleware.ts # Request validation
│
├── types/               # TypeScript type definitions
│   └── personalVoice.types.ts
│
├── db/                  # Database migrations and utilities
│   ├── migrations/      # Generated migration files
│   └── migrate.ts       # Migration runner script
│
└── server.ts            # Main application entry
```

## Architecture Layers

1. **Configuration Layer** (`/config`)
   - Manages environment variables and application settings
   - Handles database connection configuration

2. **Models Layer** (`/models`)
   - Defines database schema (using Drizzle ORM)
   - Handles direct database operations
   - Provides data access methods

3. **Services Layer** (`/services`)
   - Contains business logic
   - Orchestrates operations between models
   - Handles complex data transformations and validations
   - Throws domain-specific errors

4. **Controllers Layer** (`/controllers`)
   - Handles HTTP requests and responses
   - Delegates business logic to services
   - Does not contain business logic directly
   - Uses try/catch for error handling

5. **Routes Layer** (`/routes`)
   - Defines API endpoints
   - Maps routes to controllers
   - Applies middleware

6. **Middleware Layer** (`/middleware`)
   - Provides cross-cutting concerns like error handling
   - Validates request input
   - Handles authentication (not implemented yet)

7. **Types Layer** (`/types`)
   - Defines TypeScript interfaces and types
   - Ensures consistent data structures across layers

## Data Flow

1. Request → Routes
2. Routes → Middleware (validation) → Controllers
3. Controllers → Services
4. Services → Models
5. Models → Database
6. Response travels back up the chain

## Benefits of This Architecture

- **Separation of concerns**: Each component has a single responsibility
- **Testability**: Isolated components are easier to test
- **Maintainability**: Changes to one layer don't require changes in others
- **Scalability**: Easy to add new features or modify existing ones
- **Readability**: New developers can easily understand the project structure

## Error Handling

Errors are handled at the service layer and propagated up to controllers, which pass them to the error middleware. The error middleware formats errors appropriately for API responses. 