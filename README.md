# E-Commerce Platform Documentation (Backend)

## Overview
A full-featured e-commerce platform built with Node.js, Express, and MongoDB, featuring user authentication, product management, shopping cart functionality, and order processing.

## Features
- 🔐 User Authentication & Authorization
- 🛍️ Product Management
- 🛒 Shopping Cart
- 📦 Order Processing
- 💳 Payment Integration
- 👤 User Profile Management
- 📝 Product Reviews & Ratings
- 🔍 Search & Filtering

## Tech Stack
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Payment: Stripe
- File Upload: Multer
- Input Validation: Joi
- Documentation: Swagger

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the server
npm run dev
```

### Environment Variables
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
```

## Project Structure
```
e-commerce/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
└── server/
```

For detailed API documentation, see [API Documentation](./server/README.md)
