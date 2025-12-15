# Biz MuncH Dashboard Backend Services

A TypeScript-based RESTful API powering the management dashboard and mobile app for the Biz MuncH restaurant discount platform. This service acts as the data layer connecting admins, restaurant managers, and mobile app users through a unified MongoDB database with real-time synchronization.

**BizMuncH URL:** [bizmunch.com](https://bizmunch.com/home)

**Frontend Dashboard Repository:** [bizmunch-dashboard-site](https://github.com/JamieJiHeonKim/bizmunch_dashboard_site)

### Application Workflow

1. **User Authentication**
   - Admin/Manager/Employee hits `/users/auth/login` with email and password
   - Backend validates credentials with bcrypt password comparison
   - JWT token generated and returned with user object
   - Token stored in frontend (Redux + sessionStorage)

2. **Admin Creates a Company**
   - Dashboard sends `POST /users/dashboard/companies` with company details
   - Backend validates request with express-validator
   - Mongoose saves document to MongoDB companies collection
   - Returns company object with generated `_id`
   - Mobile app queries same collection → instant sync

3. **Admin Uploads Restaurant Logo**
   - Dashboard sends multipart/form-data with logo file
   - Multer middleware parses file upload
   - Backend streams file to GridFS (MongoDB file storage)
   - Returns GridFS file ID
   - Restaurant document saves reference: `logo: "60d5ec49f1b2c8b1f8e4e1a1"`

4. **Manager Records Transaction**
   - Dashboard sends `POST /users/dashboard/transactions` with sale data
   - Middleware verifies JWT token and checks role (manager only)
   - Transaction saved with `companyId` from authenticated user
   - Aggregation pipeline recalculates popular products
   - Analytics dashboard updates in real-time

5. **Mobile App Fetches Restaurant Menu**
   - Mobile app sends `GET /users/dashboard/restaurant/:id/details`
   - Backend queries restaurants collection and joins menu collection
   - Returns nested menu object with image URLs from GridFS
   - Mobile app displays menu with photos and discount barcodes

---

## Technologies Used

### Backend Stack
- **Node.js 18** - Async runtime with JavaScript engine
- **TypeScript** - Type safety and compile-time error checking
- **Express.js** - Lightweight HTTP framework with middleware ecosystem
- **Mongoose** - MongoDB ODM with schema validation
- **MongoDB** - Document database with nested data structures
- **GridFS** - MongoDB's file storage system for binary data

### Authentication & Security
- **JWT (jsonwebtoken)** - Stateless token-based authentication
- **Bcrypt** - Password hashing with salt rounds
- **Passport.js** - Authentication middleware (partially implemented)
- **Express-session** - Session management for development
- **Connect-mongo** - MongoDB session store

### File Upload & Processing
- **Multer** - Multipart/form-data parser for file uploads
- **GridFSBucket** - MongoDB streaming API for large files
- **UUID** - Unique identifier generation

### Validation & Error Handling
- **Express-validator** - Request validation with sanitization
- **Custom Error Classes** - Structured error handling with HTTP status codes

### Logging & Monitoring
- **Log4js** - Structured logging with file rotation
- **Debug** - Development logging utility

### API Documentation
- **Swagger UI Express** - Interactive API documentation
- **Swagger JSDoc** - Generate OpenAPI specs from JSDoc comments

### Internationalization
- **i18n** - Multi-language support (English/Japanese)
- **i18next** - Translation framework with middleware

### Deployment & DevOps
- **Docker** - Multi-stage containerized builds
- **AWS CodeDeploy** - CI/CD with automated deployment scripts
- **PM2** - Process manager for production (optional)

### Development Tools
- **Nodemon** - Auto-reload during development
- **ts-node** - Run TypeScript directly without compilation
- **Rimraf** - Cross-platform directory cleanup

---

## System Architecture

### Design Rationale

This architecture was built to support **role-based access control**, **real-time data synchronization**, and **horizontal scalability** for a multi-tenant restaurant discount platform.

**Key Design Decisions:**

1. **REST API with JWT Authentication**
   - **Why:** Stateless auth scales horizontally; no session store bottleneck; mobile app and dashboard use same auth mechanism
   - **Usage:** User logs in → JWT issued → Token included in every subsequent request → Middleware verifies token → Attaches user object to `req.user`

2. **MongoDB with GridFS for File Storage**
   - **Why:** Document-oriented schema fits nested menu structures; GridFS keeps images and data in same database; no separate S3 setup
   - **Usage:** Admin uploads restaurant logo → Multer receives file → GridFS streams to MongoDB → Returns file ID → Restaurant document stores reference

3. **Component-Based Architecture**
   - **Why:** Feature isolation (auth vs. dashboard); easier to test and maintain; clear separation of concerns
   - **Usage:** Each feature has its own controller, service, validation, and docs; easy to add new features by creating new component folder

4. **Role-Based Middleware (Admin/Manager/Employee)**
   - **Why:** Different user types need different permissions; middleware enforces access control before reaching controllers
   - **Usage:** Protected routes wrapped with `authAdmin` or `authUser` middleware → Verifies JWT → Checks role → Allows/denies access

5. **Centralized Error Handling**
   - **Why:** Consistent error responses; prevents sensitive error details from leaking; logs all errors in one place
   - **Usage:** Controllers call `next(err)` → Error handler middleware formats response → Logs error → Returns structured JSON

6. **GridFS for Binary File Storage**
   - **Why:** Transactional consistency (delete restaurant → delete associated images); simpler deployment (no S3 configuration); keeps all data in MongoDB
   - **Usage:** Images served via streaming endpoint `/images/:imageId` → GridFS streams file → No memory buffering for large files

**Real-World Usage:**
- Admin creates restaurant → Uploads logo to GridFS → Adds 10 menu items with photos → Sets discount barcodes → Mobile app queries MongoDB → Users see new restaurant immediately → Manager logs in → Records transactions → Analytics aggregation pipeline runs → Dashboard shows profit charts

### High-Level Design

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                         │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐     │
│  │  Admin Web   │   │ Manager Web  │   │  Mobile App  │     │
│  │  Dashboard   │   │  Dashboard   │   │  (React      │     │
│  │   (React)    │   │   (React)    │   │  Native)     │     │
│  └──────┬───────┘   └──────┬───────┘   └──────┬───────┘     │
│         │                  │                  │             │
│         └──────────────────┼──────────────────┘             │
│                            │                                │
└────────────────────────────┼────────────────────────────────┘
                             │ HTTPS REST API
                             │ Authorization: Bearer <JWT>
┌────────────────────────────┼────────────────────────────────┐
│                  Express.js API Server                      │
│  ┌────────────────────────────────────────────────────┐     │
│  │               Middleware Layer                     │     │
│  │  • CORS         • Body Parser   • Cookie Parser    │     │
│  │  • Log4js       • Sessions      • Error Handler    │     │
│  └────────────────────────┬───────────────────────────┘     │
│  ┌────────────────────────┴───────────────────────────┐     │
│  │             Auth Middleware                        │     │
│  │  • JWT Verification  • Role Validation             │     │
│  └────────────────────────┬───────────────────────────┘     │
│  ┌────────────────────────┴───────────────────────────┐     │
│  │             Route Layer (Components)               │     │
│  │  • /users/auth        → Authentication             │     │
│  │  • /users/dashboard   → CRUD Operations            │     │
│  └────────────────────────┬───────────────────────────┘     │
│  ┌────────────────────────┴───────────────────────────┐     │
│  │           Controller → Service → Model             │     │
│  │  • Request Handling  • Business Logic              │     │
│  │  • Validation        • DB Queries                  │     │
│  └────────────────────────┬───────────────────────────┘     │
└───────────────────────────┼─────────────────────────────────┘
                            │ Mongoose ODM
                   ┌────────▼────────┐
                   │    MongoDB      │
                   │    Database     │
                   │                 │
                   │ Collections:    │
                   │ • dashboard.    │
                   │   users         │
                   │ • companies     │
                   │ • restaurants   │
                   │ • menus         │
                   │ • transactions  │
                   │ • notifications │
                   │                 │
                   │ GridFS Buckets: │
                   │ • uploads.files │
                   │ • uploads.chunks│
                   └─────────────────┘
```

### Backend Architecture

```
src/
├── index.ts                       # Express app initialization
├── bin/
│   └── www.ts                     # HTTP server creation
│
├── components/                    # Feature-based modules
│   ├── components.ts              # Route aggregator
│   ├── user/
│   │   ├── auth/                  # Authentication feature
│   │   │   ├── auth.controller.ts # Route handlers
│   │   │   ├── auth.service.ts    # Business logic
│   │   │   ├── auth.validation.ts # Input validation
│   │   │   ├── auth.message.ts    # Response messages
│   │   │   ├── auth.docs.ts       # Swagger documentation
│   │   │   └── index.ts           # Route definitions
│   │   │
│   │   └── dashboard/             # Dashboard CRUD feature
│   │       ├── dashboard.controller.ts
│   │       ├── dashboard.service.ts
│   │       ├── dashboard.validation.ts
│   │       ├── dashboard.message.ts
│   │       ├── dashboard.docs.ts
│   │       └── index.ts
│   │
│   └── utils/                     # Shared utilities
│       ├── apiErrorHandler.ts     # Custom error classes
│       ├── ApiErrorStructure.ts   # Error formatting
│       ├── Authenticate.ts        # Token generation
│       ├── jwt.ts                 # JWT utilities
│       ├── passport.ts            # Passport strategies
│       ├── validation.ts          # Validation helpers
│       ├── s3.ts                  # AWS S3 utilities
│       └── ...
│
├── middleware/                    # Express middleware
│   ├── config.ts                  # App configuration
│   ├── cors.ts                    # CORS settings
│   ├── mongo.ts                   # MongoDB connection + GridFS
│   ├── log4.ts                    # Logger configuration
│   ├── authAdmin.ts               # Admin role verification
│   ├── authUser.ts                # User authentication
│   ├── errorHandler.ts            # Global error handler
│   ├── session.ts                 # Session configuration
│   └── Swagger.config.ts          # API documentation setup
│
├── models/                        # Mongoose schemas
│   ├── Company.ts                 # Company model
│   ├── Restaurant.ts              # Restaurant model
│   ├── Menu.ts                    # Menu model
│   ├── DashboardUser.ts           # User model with roles
│   ├── Transaction.ts             # Transaction model
│   ├── Notification.ts            # Notification model
│   └── index.ts                   # Model exports
│
├── constants/                     # Static configuration
│   ├── errorMessage.ts            # Error message constants
│   ├── rules.ts                   # Validation rules
│   ├── validation.ts              # Validation schemas
│   ├── language/
│   │   └── japan.ts               # Japanese translations
│   └── ...
│
├── locales/                       # i18n translations
│   ├── I18-locale.ts              # Locale configuration
│   ├── Language.ts                # Language types
│   └── json/
│       ├── en.json                # English translations
│       └── ja.json                # Japanese translations
│
└── @types/                        # TypeScript definitions
    ├── express.d.ts               # Custom Express types
    ├── models.d.ts                # Model type definitions
    ├── validation.d.ts            # Validation types
    └── ...
```

### Data Flow

1. **Authentication Flow**
   ```
   POST /users/auth/login → Controller receives email/password → 
   Service finds user in MongoDB → Bcrypt compares password hash → 
   JWT generated with user ID and role → Token returned to client → 
   Client stores token → Subsequent requests include Authorization header → 
   Middleware verifies JWT → Extracts user from token → Attaches to req.user
   ```

2. **CRUD Operation Flow (Example: Create Restaurant)**
   ```
   Dashboard sends POST /users/dashboard/restaurants with FormData → 
   authAdmin middleware verifies JWT and checks role === 'admin' → 
   Multer parses multipart/form-data and extracts logo file → 
   Express-validator validates name, location, category → 
   Controller calls GridFS utility to save logo → 
   GridFS returns file ID → 
   Controller creates Restaurant document with logo reference → 
   Mongoose saves to MongoDB → 
   Response returns restaurant object → 
   Mobile app queries same collection → Users see new restaurant
   ```

3. **Image Upload Flow**
   ```
   Admin selects image → Dashboard sends FormData with file → 
   Multer middleware intercepts request → 
   File buffer stored in memory → 
   saveImageToGridFS(buffer, filename, mimetype) → 
   GridFS creates upload stream → 
   Stream writes chunks to uploads.chunks collection → 
   Metadata saved to uploads.files collection → 
   Returns GridFS ObjectId → 
   Controller stores ID in restaurant/menu document → 
   Frontend requests /images/:imageId → 
   getImageFromGridFS(imageId) creates download stream → 
   Stream pipes to HTTP response → Client displays image
   ```

4. **Role-Based Access Control**
   ```
   User logs in → JWT payload includes { userId, email, status: 'admin' } → 
   Admin attempts to access /users/dashboard/companies → 
   authAdmin middleware extracts JWT from Authorization header → 
   jwt.verify() validates signature and expiration → 
   Middleware checks user.status === 'admin' → 
   If not admin, returns 403 Forbidden → 
   If admin, calls next() → Controller executes → 
   Data returned
   ```

5. **Transaction Recording Flow**
   ```
   Manager records sale in dashboard → 
   POST /users/dashboard/transactions with product data → 
   authUser middleware verifies JWT → 
   Controller checks user.status === 'manager' → 
   Transaction document created with companyId from req.user → 
   Mongoose saves to transactions collection → 
   Manager refreshes dashboard → 
   GET /users/dashboard/popularproducts → 
   Aggregation pipeline groups by productName → 
   Calculates total quantity sold → 
   Sorts by popularity → 
   Returns top 5 products → Chart updates
   ```

### Key Design Patterns

- **Controller → Service → Model Pattern:** Controllers handle HTTP, services contain business logic, models define schemas
- **Middleware-Based Security:** JWT verification and role checks happen in reusable middleware
- **Centralized Error Handling:** All errors pass through global error handler for consistent formatting
- **GridFS Abstraction:** Utility functions wrap GridFS API for cleaner controller code
- **Type-Safe Request Handling:** Custom Express types extend Request to include `req.user` and `req.language`
- **Component-Based Organization:** Features isolated in self-contained folders with controllers, services, and validation

---

## Features

### Authentication & Authorization
- **JWT-based authentication** with stateless token verification
- **Role-based access control** (Admin/Manager/Employee roles)
- **Password security** with bcrypt hashing and salt rounds
- **Session management** with connect-mongo (development only)
- **Token refresh** mechanism (partially implemented)

### Company Management (Admin Only)
- **CRUD operations** for restaurant companies/groups
- **User counting** by role (managers/employees per company)
- **Transaction aggregation** for company analytics
- **Popular products** calculation with MongoDB aggregation pipeline

### Restaurant Management (Admin Only)
- **Create/edit/delete** restaurants with location and category
- **Logo upload** to GridFS with streaming
- **Restaurant details** endpoint with nested menu data
- **Category filtering** (Asian, Fastfood, Café, Grill, Vegetarian)

### Menu Management (Admin Only)
- **Dynamic menu creation** with nested structure (appetizers, entrees, desserts)
- **Menu item CRUD** with images and discount flags
- **Barcode association** for discount redemption
- **Image storage** in GridFS for menu photos

### User Management (Admin Only)
- **Create manager accounts** assigned to companies
- **User search and filtering** by role
- **Bulk user operations** with company assignment
- **Password change** with automatic hashing

### Employee Management (Manager Only)
- **Create employee accounts** within manager's company
- **Employee CRUD** operations restricted to company scope
- **Company-scoped queries** using manager's companyId

### Transaction Recording (Manager Only)
- **Log discount redemptions** when customers use coupons
- **Product analytics** with aggregation pipelines
- **Profit calculations** based on cost and discount
- **Date-based filtering** for reporting

### Notifications System
- **Company-specific announcements** from admins
- **Platform-wide alerts** to all users
- **Notification history** with company details included
- **CRUD operations** restricted by role

### Image Serving via GridFS
- **Dynamic image retrieval** at `/images/:imageId`
- **Efficient streaming** with Node.js streams (no memory buffering)
- **Content-Type handling** from GridFS metadata
- **Logo and menu photo delivery** to dashboard and mobile app

---

## Installation & Development

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB 6+ instance (local or cloud)
- Environment variables configured

### Local Development

```bash
# Clone the repository
git clone https://github.com/JamieJiHeonKim/bizmunch_dashboard_services.git
cd bizmunch_dashboard_services

# Install dependencies
npm install

# Set up environment variables
# Create a .env file with:
PORT=3001
NODE_ENV=development
DB_PROTOCOL=mongodb+srv
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
DB_HOST=your_cluster.mongodb.net
DB_NAME=bizmunch
JWT_SECRET=your_super_secret_jwt_key
COOKIE_SECRET=your_cookie_secret
SESSION_SECRET=your_session_secret

# Run in development mode with auto-reload
npm run dev

# Open http://localhost:3001
```

### Production Build

```bash
# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm run start:pm2
```

### API Documentation

Once the server is running, visit `http://localhost:3001/api-docs` to view the interactive Swagger UI documentation.

---

## Deployment

### Docker Deployment

This project includes a multi-stage Dockerfile for optimized production builds:

```dockerfile
# Stage 1: Build
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001
CMD ["npm", "run", "start"]
```

**Deploy Steps:**

```bash
# Build the Docker image
docker build -t bizmunch-api .

# Run the container
docker run -p 3001:3001 --env-file .env bizmunch-api
```

### AWS CodeDeploy

This project is configured for AWS CodeDeploy with `appspec.yml`:

```yaml
version: 0.0
os: linux
files:
  - source: /
    destination: /home/ec2-user/app
hooks:
  BeforeInstall:
    - location: scripts/before_install.sh
      timeout: 300
  ApplicationStop:
    - location: scripts/application_stop.sh
      timeout: 300
  ApplicationStart:
    - location: scripts/application_start.sh
      timeout: 300
```

**Deployment Scripts:**

- `before_install.sh` - Installs Node.js, npm, and cleans up old files
- `application_stop.sh` - Stops running Docker container
- `application_start.sh` - Builds and starts new Docker container

**Deploy Steps:**
1. Push code to GitHub
2. AWS CodeDeploy pipeline triggers
3. EC2 instance pulls latest code
4. Deployment scripts execute in order
5. Application restarts with zero downtime

---

## API Integration

All API endpoints are documented in Swagger UI. The backend communicates with the frontend dashboard and mobile app via REST API.

### Authentication Endpoints
```javascript
PUT  /users/auth/login              // Login (returns JWT + user object)
POST /users/auth/register           // Register new user (admin only)
PUT  /users/auth/password/change    // Change password
PUT  /users/auth/profile            // Update user profile
```

### Company Endpoints (Admin Only)
```javascript
GET    /users/dashboard/companies                    // List all companies
POST   /users/dashboard/companies                    // Create company
GET    /users/dashboard/companies/:id                // Get company details
PUT    /users/dashboard/companies/:id                // Update company
DELETE /users/dashboard/companies/:id                // Delete company
GET    /users/dashboard/companies/:id/transactions   // Get company transactions
GET    /users/dashboard/companies/:id/popularproducts // Get popular products
```

### Restaurant Endpoints (Admin Only)
```javascript
GET    /users/dashboard/restaurants                  // List all restaurants
POST   /users/dashboard/restaurants                  // Create restaurant (with logo upload)
GET    /users/dashboard/restaurants/:id              // Get restaurant details
PUT    /users/dashboard/restaurants/:id              // Update restaurant
DELETE /users/dashboard/restaurants/:id              // Delete restaurant
GET    /users/dashboard/restaurant/:id/details       // Get restaurant with menu
```

### Menu Endpoints (Admin Only)
```javascript
POST /users/dashboard/menu/:restaurantId             // Add menu item (with image/barcode upload)
```

### User Management Endpoints (Admin Only)
```javascript
GET    /users/dashboard/users                        // List all users
GET    /users/dashboard/users/search?status=manager  // Search users by role
POST   /users/dashboard/managers                     // Create manager
GET    /users/dashboard/user/:id                     // Get user details
PUT    /users/dashboard/user/:id                     // Update user
DELETE /users/dashboard/user/:id                     // Delete user
```

### Employee Management Endpoints (Manager Only)
```javascript
GET    /users/dashboard/employees            // List employees in manager's company
POST   /users/dashboard/employees            // Create employee
GET    /users/dashboard/employees/:id        // Get employee details
PUT    /users/dashboard/employees/:id        // Update employee
DELETE /users/dashboard/employees/:id        // Delete employee
```

### Transaction Endpoints
```javascript
GET  /users/dashboard/transactions          // List transactions for user's company
POST /users/dashboard/transactions          // Create transaction (manager only)
GET  /users/dashboard/transactions/:id      // Get transaction details
GET  /users/dashboard/popularproducts       // Get popular products for company
GET  /users/dashboard/company/:id/details   // Get company dashboard data
```

### Notification Endpoints
```javascript
GET    /users/dashboard/notifications                // List all notifications (admin)
POST   /users/dashboard/notifications                // Create notification (admin)
GET    /users/dashboard/notifications/company        // Get company notifications
GET    /users/dashboard/notifications/:id            // Get notification details (admin)
PUT    /users/dashboard/notifications/:id            // Update notification (admin)
DELETE /users/dashboard/notifications/:id            // Delete notification (admin)
```

### Image Endpoints
```javascript
GET /users/dashboard/images/:imageId                 // Retrieve image from GridFS (streams)
```

### Request/Response Format

**Authentication Header:**
```javascript
Authorization: Bearer <JWT_TOKEN>
```

**Example Request (Create Restaurant):**
```javascript
POST /users/dashboard/restaurants
Content-Type: multipart/form-data
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

FormData:
  name: "Downtown Burgers"
  location: "123 Main St, Tokyo"
  category: "Fastfood"
  managerName: "John Doe"
  managerEmail: "john@example.com"
  logo: <File>
```

**Example Response:**
```json
{
  "status": 201,
  "message": "Restaurant created successfully",
  "data": {
    "_id": "60d5ec49f1b2c8b1f8e4e1a1",
    "name": "Downtown Burgers",
    "location": "123 Main St, Tokyo",
    "category": "Fastfood",
    "managerName": "John Doe",
    "managerEmail": "john@example.com",
    "logo": "60d5ec49f1b2c8b1f8e4e1a1"
  }
}
```

**Example Request (Login):**
```bash
curl -X PUT http://localhost:3001/users/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "password123"}'
```

**Example Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "admin@example.com",
    "name": "Admin User",
    "status": "admin",
    "companyId": "507f1f77bcf86cd799439012"
  }
}
```

---

## What I Learned

### Technical Skills Gained

**TypeScript in Production**
- Type safety caught bugs during development that would've been runtime errors in JavaScript
- Better IDE autocomplete when working with Mongoose models and Express request/response types
- Enforced consistent data shapes across controllers, services, and models
- Made refactoring safer - changing a model field immediately surfaced everywhere it was used
- Learned to write custom type definitions when library types were incomplete

**MongoDB & Mongoose Deep Dive**
- Designing schemas for nested data structures (menus with multiple types and items)
- Using aggregation pipelines for analytics (`$group`, `$sort`, `$limit` for popular products)
- GridFS for binary file storage - it's basically a filesystem API on top of MongoDB
- Pre-save hooks for automatically hashing passwords before insertion
- Understanding when to use references vs. embedded documents
- Managing MongoDB connection pooling and handling connection errors

**Authentication & Authorization Patterns**
- Built JWT auth from scratch - learned how JWTs work (header, payload, signature)
- Why stateless auth is better for horizontal scaling (no session store bottleneck)
- Middleware patterns for protecting routes and checking user roles
- The difference between authentication (who you are) and authorization (what you can do)
- Implementing role-based access control without a library

**RESTful API Design**
- Resource-based URLs (`/companies/:id` not `/getCompany?id=123`)
- HTTP method semantics (GET for reads, POST for creates, PUT for updates, DELETE for deletes)
- Proper status codes (200, 201, 400, 401, 403, 404, 500)
- Consistent response structure for success and error cases
- Versioning strategies (though not implemented in this project)

**File Upload & Streaming**
- Handling multipart/form-data with Multer (memory vs. disk storage)
- GridFS streams for efficient large file handling (no memory bloat)
- Setting correct Content-Type headers for serving images
- Buffer management when dealing with file uploads
- Error handling when streams fail mid-transfer

### Challenges Overcome

**GridFS Integration**
- MongoDB's GridFS documentation is sparse - took days to figure out the streaming API
- How to initialize `GridFSBucket` after the MongoDB connection
- Why files weren't appearing (needed to listen for `finish` event on upload stream)
- How to retrieve files by ID (had to convert string ID to `ObjectId`)
- Streaming images to Express responses without loading entire file into memory

**TypeScript + Mongoose Compatibility**
- Getting Mongoose models to work with TypeScript was painful
- Had to define both a Mongoose schema and a TypeScript interface for each model
- Mongoose's type definitions were incomplete (created custom types in `@types/models.d.ts`)
- Pre-save hooks lost type information (`this` was `any` until I figured out type assertions)
- PaginateModel types required custom typing with generics

**Role-Based Access Control Implementation**
- Structuring middleware for different permission levels
- Why storing the role in the JWT payload is convenient but risky (changing roles requires re-login)
- How to handle cascading permissions (admin can do everything managers can do)
- Preventing privilege escalation attacks

**CORS Configuration**
- Dashboard and mobile app both hit this API from different origins
- Had to configure CORS to allow multiple origins (Railway + localhost during dev)
- Preflight requests (OPTIONS) needed special handling
- Cookies didn't work cross-origin (switched to Authorization headers with JWT)

**Deployment on AWS**
- First time using CodeDeploy and writing bash deployment scripts
- Managing environment variables in production without committing secrets
- Port conflicts when the old container didn't stop cleanly
- Docker networking issues when the container couldn't reach MongoDB
- Debugging production-only bugs (missing dependencies, environment config)

### If I Built This Again

**Use NestJS Framework**
- Express is flexible but barebones - had to set up everything manually
- NestJS provides dependency injection, decorators for routes, built-in TypeScript support
- Less boilerplate for validation, error handling, and API documentation
- Better project structure conventions out of the box

**Add Comprehensive Testing**
- Didn't write tests during development (huge mistake for maintenance)
- Would add Jest for unit tests (test services in isolation)
- Supertest for integration tests (test full request/response cycles)
- Test database seeding for predictable test data
- Automated testing in CI/CD pipeline before deployment

**Use AWS S3 Instead of GridFS**
- GridFS worked but added complexity to MongoDB backups
- S3 is designed for file storage - MongoDB isn't
- S3 gives automatic backups, CDN integration, and better performance at scale
- GridFS complicates MongoDB backups (need to back up both collections and chunks)

**GraphQL Instead of REST**
- For the dashboard and mobile app, GraphQL would've been better
- Frontend could request exactly the fields it needs (no overfetching)
- Single endpoint instead of 40+ REST routes
- Built-in documentation (no Swagger setup needed)
- Real-time updates with subscriptions (perfect for notifications)

**Better Logging & Monitoring**
- Log4js is basic - would use Winston or Pino for structured logging
- Add log aggregation with CloudWatch or Datadog
- Request tracing to correlate logs across services
- Performance monitoring (response times, database query times)
- Error tracking with Sentry or Rollbar

**Schema Validation with Zod**
- Express-validator works but validation logic is scattered
- Zod defines schemas once, uses for validation, TypeScript types, and API docs
- Easier to keep validation logic in sync with TypeScript types
- Better developer experience with type inference

---

## License

MIT License - See LICENSE file for details

---

**Tech Stack Summary**: TypeScript, Node.js 18, Express.js, MongoDB, Mongoose, GridFS, JWT, Passport.js, Bcrypt, Multer, Express-validator, Log4js, Swagger UI, i18next, Docker, AWS CodeDeploy

**Related Repositories**:
- Dashboard Frontend (React): [bizmunch-dashboard-site](https://github.com/JamieJiHeonKim/bizmunch_dashboard_site)
- Mobile App (React Native): *Unfortunately the mobile app is not available for showcase*

**Note:** This is the backend API only. The frontend dashboard and React Native mobile app are in separate repositories.
