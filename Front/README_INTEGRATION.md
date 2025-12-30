# Product Manager Integration

This project connects a React frontend with a NestJS backend for product management.

## Features

- **Product Service**: Connects frontend to backend API
- **ZakiHaider Product Manager**: Clean interface for managing products
- **Backend Integration**: Fetches and creates products via REST API

## Setup

### Backend
1. Make sure the backend is running on `http://localhost:3000`
2. Ensure database is configured in `.env` file
3. Run `npm run start:dev` in the Back folder

### Frontend
1. Run `npm run dev` in the Front folder
2. Access the Product Manager at `http://localhost:5173`

## API Endpoints Used

- `GET /products` - Fetch all products
- `POST /products` - Create new product
- `GET /products/:id` - Get product by ID

## Product Data Structure

```json
{
  "name": "Product Name",
  "category_id": "category-uuid",
  "product_image": "https://example.com/image.jpg",
  "description": "Optional description"
}
```

## Changes Made

1. ✅ Created `productService.js` for API communication
2. ✅ Simplified ProductManager component
3. ✅ Added "ZakiHaider" title
4. ✅ Removed Redux dependencies and complex state management
5. ✅ Connected to real backend API
6. ✅ Updated styling for better UX

The component now loads products from the backend and allows creating new products that are persisted to the database.