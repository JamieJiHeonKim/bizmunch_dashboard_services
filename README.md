# Biz MuncH Dashboard Backend Services

A TypeScript-based RESTful API powering the management dashboard and mobile app for the Biz MuncH restaurant discount platform. This service acts as the central system connecting admins, restaurant managers, and mobile app users through a unified MongoDB database.

## Overview

Biz MuncH is a mobile application that delivers weekly rotating restaurant discounts to users. Every Monday at midnight, users receive 10 new restaurant selections with exclusive offers. This backend API is what makes the entire ecosystem work - it handles authentication, manages restaurant data, processes transactions, uploads menu photos to GridFS, and ensures that every change made in the admin dashboard appears instantly in the mobile app.

**The problem this solves:** Restaurant partners need a robust API to handle real-time data updates, admins need secure role-based access control, and the mobile app needs fast, reliable data fetching. This backend bridges all three with a scalable Node.js architecture.

## System Architecture

### The Big Picture

```
Admin Dashboard (React) ⟷ REST API (Express + TypeScript) ⟷ MongoDB ⟷ Mobile App (React Native)
                                        ⬆
                                    GridFS (Image Storage)
```

This API is the **data layer and business logic hub** for the entire Biz MuncH ecosystem:
- **Frontend**: React dashboard (separate repo) makes authenticated HTTP requests to this API
- **Backend**: TypeScript + Express RESTful API with JWT authentication
- **Database**: MongoDB with GridFS for binary file storage (restaurant logos, menu photos, QR codes)
- **Mobile App**: React Native app (separate repo) reads from the same MongoDB instance
- **Deployment**: Dockerized with AWS CodeDeploy for CI/CD

All CRUD operations flow through this API. When an admin uploads a restaurant logo or a manager creates a transaction, this service validates the request, transforms the data, and writes to MongoDB. The mobile app immediately reflects these changes because it queries the same database.

### Role-Based Access Control

The API enforces three distinct user roles with permission-based middleware:

**Admin Role:** (So far only Admin Role  is fully working)
- Full CRUD access to companies (restaurant groups)
- Manage all restaurants and their menus
- Create manager accounts and assign them to companies
- Upload images to GridFS (logos, menu photos, discount barcodes)
- View all users and transactions across the platform
- Send platform-wide or company-specific notifications

**Manager Role:** (Not yet completed)
- View dashboard analytics for their assigned company
- Create and manage employee accounts within their company
- Record transactions when discounts are redeemed in-store
- Access popular product statistics and transaction history
- Receive notifications from admins

**Employee Role:** (Not yet started)
- View personal dashboard and account settings
- Update profile information and change password
- Access company-specific notifications

Middleware functions (`authAdmin`, `authUser`) verify JWT tokens and check user roles before allowing access to protected endpoints.

## Tech Stack & Why I Chose Each

### Runtime & Language
**Node.js 18 with TypeScript** as the foundation. I went with TypeScript because:
- Type safety caught bugs during development that would've been runtime errors in vanilla JS
- Better IDE autocomplete when working with Mongoose models and Express request/response types
- Enforced consistent data shapes across controllers, services, and models

**Why Node.js?** The dashboard and mobile app are both JavaScript-based (React/React Native), so using Node.js for the backend meant sharing validation logic, using the same date libraries (dayjs), and thinking in the same async/await patterns across the stack.

### Web Framework
**Express.js** for the HTTP server:
- Lightweight and flexible
- Massive ecosystem of middleware (cors, cookie-parser, multer, express-validator)
- Easy to structure as component-based modules (auth component, dashboard component)
- Simple route mounting with `app.use('/users', userRoutes)`

### Database & ODM
**MongoDB with Mongoose** for data persistence:
- Flexible schema design - could iterate on models without migrations as requirements changed
- GridFS for storing binary files (images, QR codes) directly in MongoDB
- Mongoose for schema validation, middleware hooks (password hashing on save), and TypeScript integration
- Native support for aggregation pipelines (used for popular product queries)

**Why MongoDB over SQL?** The data model is document-oriented (restaurants have nested menu items, users belong to companies). MongoDB's nested documents and arrays fit naturally. Plus, both the dashboard and mobile app query the same database, and MongoDB's flexibility made it easy to add fields like `discount` or `barcode` to menu items without schema migrations.

**GridFS Integration**: Instead of using AWS S3 for images, I implemented GridFS (MongoDB's file storage system):
- Keeps all data in one place (no separate storage service to manage)
- Handles file streaming efficiently for serving images via Express routes
- Transactional consistency - if a restaurant is deleted, GridFS cleanup happens in the same database operation
- Simpler deployment (no S3 bucket configuration needed)

### Authentication & Security
**JWT (JSON Web Tokens) with Passport.js**:
- Stateless authentication
- JWT payload contains user ID, email, and role for permission checks
- Tokens issued on login and verified by middleware on protected routes
- Used `express-session` with `connect-mongo` for session persistence during development

**Bcrypt for password hashing**:
- Passwords salted and hashed before storing in MongoDB
- Mongoose pre-save hook automatically hashes passwords on user creation
- `comparePassword` method on user model for login validation

**Why JWT over sessions?** The mobile app needs to authenticate too, and sending a token with each request is simpler than managing session cookies across web and mobile clients. JWTs also make horizontal scaling easier since there's no shared session store.

### Input Validation
**Express-validator** for request validation:
- Declarative validation rules in separate validation files (`auth.validation.ts`, `dashboard.validation.ts`)
- Sanitizes inputs to prevent injection attacks
- Returns structured error messages to the frontend
- Example: Email format validation, password strength checks, required field enforcement

**Type-safe validation**: Used custom TypeScript types (`@types/validation.d.ts`) to ensure validators and controllers agree on expected request shapes.

### Image Upload & Processing
**Multer** for handling multipart/form-data:
- Parses file uploads from the dashboard's FormData submissions
- Stores files in memory buffers before writing to GridFS
- Handles multiple file fields (logo, barcode, menu images)
- File type filtering to prevent non-image uploads

**GridFS streaming**: Custom utility functions (`saveImageToGridFS`, `getImageFromGridFS`) wrap MongoDB's GridFSBucket API for cleaner controller code.

### API Documentation
**Swagger UI with swagger-jsdoc**:
- Auto-generated API documentation from JSDoc comments in route files
- Interactive UI at `/api-docs` for testing endpoints without Postman
- Documents request/response schemas, authentication requirements, and error codes
- Kept docs in sync with code by generating them from source

### Error Handling
**Centralized error handler middleware**:
- Custom `ApiErrorStructure` class for consistent error responses
- Error handler middleware catches all thrown errors and formats them
- HTTP status codes mapped to error types (400 for validation, 401 for auth, 500 for server errors)
- Prevents sensitive error details from leaking to clients in production

### Deployment & DevOps
**Docker** for containerization:
- Multi-stage Dockerfile: `npm install` → `npm run build` → run compiled JS
- Alpine Linux base image (node:18-alpine) for smaller container size
- Exposed on port 3001
- Environment variables passed at runtime for DB connection strings

**Why Docker?** Ensures the app runs identically on my laptop, staging, and production. No "works on my machine" issues. Docker Compose could orchestrate MongoDB locally, and the same image deploys to AWS.

## Project Structure

```
src/
├── index.ts                       # Express app initialization and server start
├── components/                    # Feature-based component modules
│   ├── user/
│   │   ├── auth/                  # Authentication endpoints (login, register, password change)
│   │   │   ├── auth.controller.ts # Route handlers for auth
│   │   │   ├── auth.service.ts    # Business logic (token generation, password hashing)
│   │   │   ├── auth.validation.ts # Express-validator rules for auth requests
│   │   │   └── auth.docs.ts       # Swagger documentation for auth endpoints
│   │   ├── dashboard/             # Dashboard CRUD operations
│   │   │   ├── dashboard.controller.ts # Companies, restaurants, menus, users, notifications
│   │   │   ├── dashboard.service.ts    # Business logic for dashboard operations
│   │   │   └── dashboard.validation.ts # Validation rules for dashboard requests
│   └── utils/                     # Utility functions and helpers
│       ├── apiErrorHandler.ts     # Custom error classes and error handling utilities
│       ├── jwt.ts                 # JWT token generation and verification
│       ├── passport.ts            # Passport.js strategies (not fully implemented)
│       └── validation.ts          # Reusable validation helpers
├── middleware/                    # Express middleware
│   ├── authAdmin.ts               # Verify JWT and check for admin role
│   ├── authUser.ts                # Verify JWT for any authenticated user
│   ├── config.ts                  # Express app configuration (CORS, body-parser, sessions)
│   ├── cors.ts                    # CORS configuration for dashboard and mobile app
│   ├── mongo.ts                   # MongoDB connection and GridFS utilities
│   └── Swagger.config.ts          # Swagger UI setup
├── models/                        # Mongoose schemas and models
│   ├── Company.ts                 # Restaurant company/group model
│   ├── Restaurant.ts              # Individual restaurant locations
│   ├── Menu.ts                    # Menu items nested by type (appetizer, entree, etc.)
│   ├── DashboardUser.ts           # Admin/manager/employee accounts
│   ├── Transaction.ts             # Discount redemption records
│   └── Notification.ts            # Platform announcements
└── @types/                        # TypeScript type definitions
    ├── models.d.ts                # Type definitions for Mongoose models
    ├── express.d.ts               # Custom Express request/response types
    └── validation.d.ts            # Validation-related types
```

### Design Patterns I Used

**Component-Based Architecture**: Organized by feature (`auth`, `dashboard`) instead of technical layer (controllers, services, models all in one directory):
- Each component is self-contained with its own controller, service, validation, and docs
- Easy to add new features
- Clear separation of concerns within each component

**Controller → Service → Model Pattern**:
- **Controllers** handle HTTP request/response, call services, and send responses
- **Services** contain business logic (calculating profits, aggregating data, interacting with multiple models)
- **Models** define data schemas and database interactions
- Keeps controllers thin and services testable

**Middleware-Based Security**:
- `authAdmin` and `authUser` middleware wrap protected routes
- JWT verification happens once in middleware, then `req.user` is available to all downstream handlers
- Role-based checks in controllers: `if (user.status !== 'admin') return 403`

**GridFS Abstraction**:
- Wrapped GridFSBucket's stream API in utility functions (`saveImageToGridFS`, `getImageFromGridFS`)
- Controllers don't need to understand MongoDB streams
- Makes it easy to swap GridFS for S3 later if needed

**Type-Safe Request Handling**:
- Custom Express types extend `Request` to include `req.user` and `req.language`
- TypeScript catches typos like `req.usr` at compile time
- Auto-complete for model fields in controllers

## Key Features

### Authentication & Authorization
- **JWT-based auth**: Login returns a token, subsequent requests include `Authorization: Bearer <token>`
- **Role-based access control**: Middleware checks user role before allowing access to admin/manager-only endpoints
- **Password security**: Bcrypt hashing with salt rounds, pre-save hooks for automatic hashing
- **Token refresh**: Refresh token stored in DB for long-lived sessions (not fully implemented)

### Company & Restaurant Management
- **CRUD operations**: Admins can create, read, update, and delete companies and restaurants
- **Image upload to GridFS**: Restaurant logos and menu photos stored in MongoDB
- **Company hierarchy**: Companies have many restaurants, restaurants have many menu items
- **Category filtering**: Restaurants tagged by cuisine (Asian, Fastfood, Café, Grill)

### Menu Management
- **Nested menu structure**: Menus stored as objects with type keys (appetizers, entrees) containing item objects
- **Dynamic menu updates**: Adding a menu item updates the nested structure using `$set` operator
- **Image association**: Each menu item can have an image stored in GridFS
- **Discount tracking**: Menu items flagged with `discount: true` and associated barcode images

### User Management
- **Three-tier user system**: Admin, Manager, Employee roles with different permissions
- **Company assignment**: Users linked to companies via `companyId` reference
- **User search and filtering**: Query users by role or company
- **Bulk user operations**: Create multiple employees under a manager's company

### Notifications System
- **Company-specific announcements**: Admins send notifications to specific companies
- **Platform-wide alerts**: Broadcast messages to all users
- **Notification history**: Users can view past notifications

### Image Serving via GridFS
- **Dynamic image retrieval**: `/images/:imageId` endpoint streams images from GridFS
- **Efficient streaming**: Uses Node.js streams to pipe images to the response (no buffering entire file in memory)
- **Content-Type handling**: Automatically sets correct MIME type based on GridFS metadata

## What I Learned

### Technical Skills Gained

**TypeScript in Production**: Using TypeScript for a backend API was a pleasant experience. The type system caught so many bugs before runtime
- Misspelled model fields surfaced at compile time
- Request body types enforced with express-validator + TypeScript
- IDE autocomplete for Mongoose models made writing queries faster

**MongoDB & Mongoose Deep Dive**: Learned way more about document databases than I expected
- Designing schemas for nested data (menus with multiple types and items)
- Using aggregation pipelines for analytics (popular products query uses `$group` and `$sort`)
- GridFS for binary file storage
- Pre-save hooks for automatically hashing passwords

**Authentication Patterns**: Building JWT auth from scratch taught me
- How JWTs work under the hood (header, payload, signature)
- Why stateless auth is better for scaling (no session store bottleneck)
- Middleware patterns for protecting routes
- The difference between authentication (who you are) and authorization (what you can do)

**RESTful API Design**: Learned best practices for structuring endpoints
- Resource-based URLs (`/companies/:id` not `/getCompany?id=123`)
- HTTP method semantics (GET for reads, POST for creates, PUT for updates, DELETE for deletes)
- Proper status codes (200, 201, 400, 401, 403, 404, 500)
- Consistent response structure (`{ message: string, data?: any }`)

**File Uploads & Streaming**: Handling multipart/form-data and binary files was tricky
- Multer for parsing file uploads (kept crashing until I configured memory storage correctly)
- GridFS streams for efficient large file handling
- Setting correct Content-Type headers for serving images
- Debugging why files weren't appearing in GridFS (forgot to call `uploadStream.end()`)

### Challenges Overcome

**GridFS Integration**: MongoDB's GridFS documentation is sparse. Took days to figure out:
- How to initialize `GridFSBucket` after the MongoDB connection
- Why files weren't appearing (needed to listen for `finish` event on upload stream)
- How to retrieve files by ID (had to convert string ID to `ObjectId`)
- Streaming images to Express responses without loading entire file into memory

**TypeScript + Mongoose**: Getting Mongoose models to work with TypeScript was painful:
- Had to define both a schema and a TypeScript interface for each model
- Mongoose's type definitions were incomplete (had to create custom types in `@types/models.d.ts`)
- Pre-save hooks lost type information (`this` was `any` until I figured out type assertions)
- PaginateModel types required custom typing

**Role-Based Access Control**: Implementing RBAC without a library taught me:
- How to structure middleware for different permission levels
- Why storing the role in the JWT payload is convenient but risky (changing roles requires re-login)
- How to handle cascading permissions (admin can do everything managers can do)

**CORS Configuration**: The dashboard and mobile app both hit this API, but from different origins:
- Had to configure CORS to allow multiple origins (dashboard on Railway, mobile app on localhost during dev)
- Preflight requests (OPTIONS) needed special handling
- Cookies didn't work cross-origin (switched to Authorization headers)

**Deployment on AWS**: First time using CodeDeploy and writing deployment scripts:
- Bash scripts for stopping/starting the app
- Managing environment variables in production (DATABASE_URL, JWT_SECRET)
- Port conflicts when the old container didn't stop cleanly
- Docker networking issues when the container couldn't reach MongoDB

**Validation Logic**: Express-validator is powerful but verbose:
- Wrote a lot of validation chains (`body('email').isEmail().normalizeEmail()`)
- Had to manually check validation results in controllers at first
- Later extracted validation into separate files and used middleware to check results
- Localized error messages by mapping validation errors to i18n keys

### If I Built This Again

**Use a Framework like NestJS**: Express is flexible but barebones. NestJS would've given me
- Dependency injection out of the box
- Decorators for route definitions and validation
- Built-in TypeScript support with less boilerplate
- Better project structure conventions

**Add Unit & Integration Tests**: Didn't write tests during development. Would add
- Jest for unit tests (test services in isolation)
- Supertest for integration tests (test full request/response cycles)
- Test database seeding for predictable test data
- Automated testing in CI/CD pipeline

**Use AWS S3 Instead of GridFS**: GridFS worked but added complexity
- S3 is designed for file storage, MongoDB isn't
- S3 gives you automatic backups, CDN integration, and better performance at scale
- GridFS complicates MongoDB backups (need to back up both collections and files.chunks)

**GraphQL Instead of REST**: For the dashboard and mobile app, GraphQL would've been better:
- Frontend could request exactly the fields it needs (no overfetching)
- Single endpoint instead of 40+ REST routes
- Built-in documentation (no Swagger setup needed)
- Real-time updates with subscriptions (for notifications)

**Refactor Validation**: Express-validator works but validation logic is scattered:
- Would use Zod or Joi for centralized schema validation
- Define schemas once and use them for validation, TypeScript types, and API docs
- Easier to keep validation logic in sync with TypeScript types

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB 6+ instance (local or cloud)
- Environment variables (see below)

### Environment Variables

Create a `.env` file in the root:

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DB_PROTOCOL=mongodb+srv
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
DB_HOST=your_cluster.mongodb.net
DB_NAME=bizmunch

# Authentication
JWT_SECRET=your_super_secret_jwt_key
COOKIE_SECRET=your_cookie_secret

# Session
SESSION_SECRET=your_session_secret
```

### Installation

```bash
# Install dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run production build
npm start
```

The API will start at `http://localhost:3001`.

### API Documentation

Once the server is running, visit `http://localhost:3001/api-docs` to view the interactive Swagger UI documentation.

### Testing Endpoints

Example login request:

```bash
curl -X PUT http://localhost:3001/users/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "password123"}'
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "admin@example.com",
    "name": "Admin User",
    "status": "admin"
  }
}
```

Use the token in subsequent requests:

```bash
curl -X GET http://localhost:3001/users/dashboard/companies \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Docker Deployment

```bash
# Build the Docker image
docker build -t bizmunch-api .

# Run the container
docker run -p 3001:3001 --env-file .env bizmunch-api
```

For production deployment with Docker Compose:

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DB_PROTOCOL=mongodb+srv
      - DB_HOST=${DB_HOST}
      - DB_USER=${DB_USER}
      - DB_PASS=${DB_PASS}
      - DB_NAME=bizmunch
      - JWT_SECRET=${JWT_SECRET}
```

## API Endpoints Overview

### Authentication (`/users/auth`)
- `PUT /login` - User login (returns JWT)
- `POST /register` - Register new user (admin only)
- `PUT /password/change` - Change user password
- `PUT /profile` - Update user profile

### Companies (`/users/dashboard/companies`)
- `GET /` - List all companies (admin only)
- `POST /` - Create company (admin only)
- `GET /:id` - Get company details (admin only)
- `PUT /:id` - Update company (admin only)
- `DELETE /:id` - Delete company (admin only)

### Restaurants (`/users/dashboard/restaurants`)
- `GET /` - List all restaurants (admin only)
- `POST /` - Create restaurant with logo upload (admin only)
- `GET /:id` - Get restaurant details with menu (admin only)
- `PUT /:id` - Update restaurant (admin only)
- `DELETE /:id` - Delete restaurant (admin only)

### Menus (`/users/dashboard/menu`)
- `POST /:restaurantId` - Add menu item with image upload (admin only)

### Users (`/users/dashboard/users`)
- `GET /` - List all users (admin only)
- `GET /search` - Search users by role (admin only)
- `POST /managers` - Create manager account (admin only)
- `GET /:id` - Get user details (admin only)
- `PUT /:id` - Update user (admin only)
- `DELETE /:id` - Delete user (admin only)

### Employees (`/users/dashboard/employees`)
- `GET /` - List employees in manager's company (manager only)
- `POST /` - Create employee (manager only)
- `GET /:id` - Get employee details (manager only)
- `PUT /:id` - Update employee (manager only)
- `DELETE /:id` - Delete employee (manager only)

### Transactions (`/users/dashboard/transactions`)
- `GET /` - List transactions for user's company
- `POST /` - Create transaction record (manager only)
- `GET /:id` - Get transaction details

### Notifications (`/users/dashboard/notifications`)
- `GET /` - List all notifications (admin only)
- `POST /` - Create notification (admin only)
- `GET /company` - Get company-specific notifications (manager/employee)
- `GET /:id` - Get notification details (admin only)
- `PUT /:id` - Update notification (admin only)
- `DELETE /:id` - Delete notification (admin only)

### Images (`/users/dashboard/images`)
- `GET /:imageId` - Retrieve image from GridFS (streams image data)

## License

This project is part of my portfolio. Feel free to look around, but please don't copy it wholesale for your own portfolio.
