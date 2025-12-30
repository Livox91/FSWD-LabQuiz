# Quiz Application - Docker Setup

This project includes Docker configurations for both development and production environments.

## 🚀 Quick Start

### Production
```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop services
docker-compose down
```

### Development
```bash
# Build and run development environment
docker-compose -f docker-compose.dev.yml up --build

# Run in background
docker-compose -f docker-compose.dev.yml up -d --build

# Stop development services
docker-compose -f docker-compose.dev.yml down
```

## 📦 Services

### Production (`docker-compose.yml`)
- **Frontend**: Nginx serving built React app on port `80`
- **Backend**: NestJS API on port `3000`
- **Database**: PostgreSQL on port `5432`

### Development (`docker-compose.dev.yml`)
- **Frontend**: Vite dev server with hot reload on port `5173`
- **Backend**: NestJS with hot reload and debug port `9229`
- **Database**: PostgreSQL on port `5432`

## 🔧 Configuration

### Environment Variables
The backend uses these environment variables (configured in docker-compose files):
- `DB_HOST=postgres`
- `DB_PORT=5432`
- `DB_USERNAME=postgres`
- `DB_PASSWORD=postgres`
- `DB_DATABASE=semester_project`
- `PORT=3000`

### Volumes
- **Production**: `postgres_data` for database persistence
- **Development**: `postgres_data_dev` + source code volumes for hot reload

## 🌐 Access URLs

### Production
- Frontend: http://localhost
- Backend API: http://localhost:3000
- Database: localhost:5432

### Development
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Backend Debug: localhost:9229
- Database: localhost:5432

## 🛠️ Useful Commands

```bash
# View logs
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend

# Execute commands in running containers
docker-compose exec backend bash
docker-compose exec postgres psql -U postgres -d semester_project

# Clean up
docker-compose down -v  # Remove volumes
docker system prune     # Clean up unused resources

# Rebuild specific service
docker-compose build backend
docker-compose up -d backend
```

## 🔍 Health Checks

The backend includes a health check that verifies the service is running correctly.

## 📝 Notes

- The frontend is configured with Nginx for production serving
- Development mode includes hot reload for both frontend and backend
- PostgreSQL data persists between container restarts
- CORS is enabled on the backend for frontend communication
- The backend includes TypeORM with auto-synchronization enabled