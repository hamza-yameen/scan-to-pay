# Project Documentation
## Introduction
1. NestJS with TypeScript: A Node.js framework for building scalable applications using TypeScript.
2. PostgreSQL: Relational database used for data management.
3. Docker: Containerization for consistent development environments.
4. Prisma ORM: Simplifies database interactions with type-safe queries.
5. JWT Token: Used for authentication and authorization.

## Setup Instructions
Clone Repo:
```bash
git clone https://github.com/your-repo/project.git
```

Install Dependencies:
```bash
npm install
```

For Docker:
```bash
docker-compose up -d
```

Run Migrations:
```bash
npx prisma migrate dev
```

Run Project:
```bash
npm start dev
```
 
## Application Endpoints
The application consists of 5 main modules: User, Booking, Merchant, Review, and Payment. Each module contains several endpoints to manage various operations.

### 1. User Module
This module handles user registration, login, and profile management. Authentication is managed using JWT tokens.
* POST /user/register:    Register a new user.
* POST /user/login:       Authenticate and log in as a user.
* GET /user/profile:      Get the logged-in user's profile (requires authentication).

### 2. Booking Module
This module manages booking operations for users and merchants.
* POST /bookings/add:           Create a new booking.
* GET /bookings/all:            Get All bookings detail.
* GET /bookings/:id:            Get booking details by ID.
* PATCH /bookings/:id/status:   Update the status of a booking.

### 3. Merchant Module
This module manages merchants and their details.
* POST /merchant/add:       Register a new merchant.
* GET /merchant/find/:id:   Get merchant details by ID.
* GET /merchant:            Get all merchant details.
* Patch /merchant/:id:      Update merchant details.
* Delete /merchant/:id:     Delete merchant details.

### 4. Review Module
This module allows users to leave reviews for their bookings.
* POST /reviews/add:                   Submit a review for a booking.
* GET /reviews/user:                   Get reviews by user ID.
* GET /reviews/merchant/:merchantId:   Get reviews by merchant ID.

### 5. Payment Module
This module manages payments for bookings.
* POST /payment/scan:            Process a payment for a booking.
* GET /payments/bookingId:       Get payment details by booing ID.
