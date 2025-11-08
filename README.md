# New Paltz Hackathon 2025

## Project Structure

```
├── client/          # Frontend - Person 1
├── server/          # Backend API - Person 2  
├── database/        # DB schemas & config - Person 3
└── shared/          # Shared types/constants
```

## Team Responsibilities

### 👤 Person 1: Frontend (`client/`)
- Vue.js components and pages
- Client-side routing
- State management
- UI/UX implementation

### 👤 Person 2: Backend (`server/`)
- REST API endpoints
- Business logic
- Authentication & authorization
- API documentation

### 👤 Person 3: Database & DevOps (`database/`)
- Database schema design
- Migrations and seeds
- Shared TypeScript types
- Environment configuration
- Integration testing

## Getting Started

### Initial Setup
```bash
# Install all dependencies
npm install

# Setup environment files
cp .env.example .env
```

### Development
```bash
# Run client (Person 1)
cd client && npm run dev

# Run server (Person 2)
cd server && npm run dev

# Run database migrations (Person 3)
cd database && npm run migrate
```

## Git Workflow

1. Create feature branches: `git checkout -b feature/your-feature`
2. Work in your designated folder
3. Commit often with clear messages
4. Push and create PR when ready
5. Request review from teammates

## API Contract

Document your API endpoints in `shared/api-spec.md`
Share TypeScript interfaces in `shared/types/`
