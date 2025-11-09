# New Paltz Hackathon 2025

## Project Structure

```
├── client/          # Frontend - Johnny
├── server/          # Backend API - Jack, Joe
```

## Getting Started

### Initial Setup
```bash
# Install all dependencies
npm run install:all

# Setup environment files
cp .env.example .env
```

### Development
```bash
#run client + server
"dev": "concurrently \"npm:dev:client\" \"npm:dev:server\"",

"dev:client": "npm --prefix client run dev",
"dev:server": "nodemon --watch server --exec \"node server/index.js\"",
